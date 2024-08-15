import api from '@/redux/api'
import { apiURL } from '../utils'
import { ICompany } from '@/types/ICompany'
import { IParams } from './../../types/common/IParams'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'

const rootApi = '/companies'

const companiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCompanies: build.query<IResponseWithMeta<Array<WithId<ICompany>>>, IParams>({
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
      })
    }),
    getCompany: build.query<IResponse<WithId<ICompany>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      })
    }),
    updateCompany: build.mutation<IResponse<WithId<ICompany>>, { id: string; body: Partial<ICompany> }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      })
    }),
    deleteCompany: build.mutation<IResponse<WithId<ICompany>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      })
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
