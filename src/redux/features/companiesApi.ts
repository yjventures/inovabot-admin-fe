import api from '@/redux/api'
import { apiURL } from '../utils'
import { ICompany } from '@/types/ICompany'
import { IParams, IResponseWithMeta } from './../../types/common/IParams'

const rootApi = '/companies'

const companiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCompanies: build.query<IResponseWithMeta<ICompany[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['companies']
    })
  })
})

export const { useGetCompaniesQuery } = companiesApi
