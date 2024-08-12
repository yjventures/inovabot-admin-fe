import api from '@/redux/api'
import { apiURL } from '../utils'
import { ICompany } from '@/types/ICompany'

const rootApi = '/companies'

const companiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCompanies: build.query<ICompany[], any>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['companies']
    })
  })
})

export const { useGetCompaniesQuery } = companiesApi
