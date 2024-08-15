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
    })
  })
})

export const { useGetCompaniesQuery } = companiesApi
