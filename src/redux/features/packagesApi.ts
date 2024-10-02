import api from '@/redux/api'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { IPackage } from '@/types/IPackage'
import { apiURL } from '../utils'
import { IParams } from './../../types/common/IParams'

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
    createPackage: build.mutation({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['packages']
    }),
    getPackage: build.query({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['package']
    }),
    updatePackage: build.mutation({
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
    }),
    updateSubscription: build.mutation({
      query: body => ({
        url: '/subscription/update',
        method: 'POST',
        body
      }),
      invalidatesTags: ['company']
    }),
    cancelSubscription: build.mutation({
      query: () => ({
        url: '/subscription/cancel',
        method: 'POST'
      }),
      invalidatesTags: ['company']
    })
  })
})

export const {
  useGetPackagesQuery,
  useGetPackageQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useUpdateSubscriptionMutation,
  useCancelSubscriptionMutation
} = packagesApi
