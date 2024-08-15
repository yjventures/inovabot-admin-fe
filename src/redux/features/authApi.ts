import api from '@/redux/api'

const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: payload => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...payload, type: 'email' }
      })
    })
  })
})

export const { useLoginMutation } = authApi
