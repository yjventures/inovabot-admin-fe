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
    createCompany: build.mutation<IResponse<WithId<ICompany>>, ICompany>({
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
    updateCompany: build.mutation<IResponse<WithId<ICompany>>, { id: string; payload: Partial<ICompany> }>({
      query: ({ id, payload }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['company', 'companies']
    }),
    deleteCompany: build.mutation<IResponse<WithId<ICompany>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['companies']
    })
  })
})

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation
} = companiesApi
