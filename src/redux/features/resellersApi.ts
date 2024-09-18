import api from '../api'

const rootApi = '/resellers'

const resellersApi = api.injectEndpoints({
  endpoints: build => ({
    inviteReseller: build.mutation({
      query: body => ({
        url: '/invitation/invite-reseller',
        method: 'POST',
        body
      })
    })
  })
})

export const { useInviteResellerMutation } = resellersApi
