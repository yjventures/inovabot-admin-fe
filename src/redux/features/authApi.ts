import api from '@/redux/api'

const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...body, type: 'email' }
      })
    }),
    checkTempPassword: build.mutation({
      query: body => ({
        url: '/invitation/check-password',
        method: 'POST',
        body
      })
    }),
    resetPassword: build.mutation({
      query: body => ({
        url: '/password-manager/reset-password',
        method: 'POST',
        body
      })
    })
  })
})

export const { useLoginMutation, useCheckTempPasswordMutation, useResetPasswordMutation } = authApi
