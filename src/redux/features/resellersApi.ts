import api from '../api'

const resellersApi = api.injectEndpoints({
  endpoints: build => ({
    inviteReseller: build.mutation({
      query: body => ({
        url: '/invitation/invite-reseller',
        method: 'POST',
        body
      })
    }),
    getAllSubscriptions: build.query({
      query: params => ({
        url: '/packages/get-all',
        params
      })
    }),
    subscribeToPackage: build.mutation({
      query: payload => ({
        url: '/subscription/create',
        method: 'POST',
        body: payload
      })
    })
  })
})

export const { useInviteResellerMutation, useGetAllSubscriptionsQuery, useSubscribeToPackageMutation } = resellersApi
