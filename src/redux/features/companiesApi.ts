import api from '@/redux/api'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import { apiURL } from '../utils'
import { IParams } from './../../types/common/IParams'

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
    getComanyList: build.query<IResponse<WithId<{ name: string }>[]>, {}>({
      query: () => ({
        url: '/companies/get-list'
      })
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
    }),
    sendTeamInvitation: build.mutation({
      query: body => ({
        url: '/invitation/invite-user',
        method: 'POST',
        body
      })
    }),
    getStorageInfo: build.mutation<IResponse<{ totalStorage: number; usedStorage: number }>, string>({
      query: company_id => ({
        url: `${rootApi}/get-storage`,
        method: 'POST',
        body: { company_id }
      })
    }),
    updateCompanyMemberRole: build.mutation({
      query: body => ({
        url: '/users/update-role',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['users']
    })
  })
})

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useSendCompanyInvitationMutation,
  useGetComanyListQuery,
  useGetStorageInfoMutation,
  useSendTeamInvitationMutation,
  useUpdateCompanyMemberRoleMutation
} = companiesApi
