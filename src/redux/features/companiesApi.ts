import api from '@/redux/api'
import { apiURL } from '../utils'
import { ICompany } from '@/types/ICompany'
import { IParams } from './../../types/common/IParams'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'

const rootApi = '/companies'

const companiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCompanies: build.query<IResponseWithMeta<WithId<ICompany>[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['companies']
    }),
    createCompany: build.mutation<{ company: WithId<ICompany> }, ICompany>({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['companies']
    }),
    getCompany: build.query<IResponse<WithId<ICompany>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['company']
    }),
    updateCompany: build.mutation<IResponse<WithId<ICompany>>, { id: string; body: Partial<ICompany> }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['company', 'companies']
    }),
    deleteCompany: build.mutation<IResponse<WithId<ICompany>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['companies']
    }),
    sendCompanyInvitation: build.mutation({
      query: body => ({
        url: '/invitation/invite-company-admin',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useSendCompanyInvitationMutation
} = companiesApi
