import { IParams } from '@/types/common/IParams'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { IUser } from '@/types/IUser'
import api from '../api'
import { apiURL } from '../utils'

const rootApi = '/users'

const usersApi = api.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query<IResponseWithMeta<WithId<IUser & { company?: { name: string } }>[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['users']
    }),
    deleteUser: build.mutation<IResponse<WithId<IUser>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['users']
    }),
    getUser: build.query<{ user: WithId<IUser> }, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['user']
    }),
    updateProfile: build.mutation({
      query: body => ({
        url: `${rootApi}/update`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['user']
    }),
    inviteAdmin: build.mutation({
      query: body => ({
        url: 'invitation/invite-admin',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateProfileMutation,
  useInviteAdminMutation
} = usersApi
