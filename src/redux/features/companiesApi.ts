import api from '@/redux/api'
import { apiURL } from '../utils'
import { ICompany } from '@/types/ICompany'
import { IParams } from './../../types/common/IParams'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'

const rootApi = '/companies'

const companiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCompanies: build.query<IResponseWithMeta<WithId<ICompany>[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['companies']
    })
  })
})

export const { useGetCompaniesQuery } = companiesApi
