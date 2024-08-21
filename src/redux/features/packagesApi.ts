import api from '@/redux/api'
import { apiURL } from '../utils'
import { IParams } from './../../types/common/IParams'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { IPackage } from '@/types/IPackage'

const rootApi = '/packages'

const packagesApi = api.injectEndpoints({
  endpoints: build => ({
    getPackages: build.query<IResponseWithMeta<WithId<IPackage>[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['packages']
    }),
    createPackage: build.mutation<IResponse<WithId<IPackage>>, IPackage>({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['packages']
    }),
    getPackage: build.query<IResponse<WithId<IPackage>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['package']
    }),
    updatePackage: build.mutation<IResponse<WithId<IPackage>>, { id: string; body: Partial<IPackage> }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['package', 'packages']
    }),
    deletePackage: build.mutation<IResponse<WithId<IPackage>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['packages']
    })
  })
})

export const {
  useGetPackagesQuery,
  useGetPackageQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation
} = packagesApi
