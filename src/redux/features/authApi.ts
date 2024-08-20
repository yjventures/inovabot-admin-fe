import api from '@/redux/api'

const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...body, type: 'email' }
      })
    })
  })
})

export const { useLoginMutation } = authApi
