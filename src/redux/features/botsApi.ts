import api from '@/redux/api'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { IBot } from '@/types/IBot'
import { apiURL } from '../utils'
import { IParams } from './../../types/common/IParams'

const rootApi = '/bots'

const botsApi = api.injectEndpoints({
  endpoints: build => ({
    getBots: build.query<IResponseWithMeta<WithId<IBot>[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['bots']
    }),
    createBot: build.mutation<{ bot: WithId<IBot> }, IBot>({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['bots']
    }),
    getBot: build.query<{ data: WithId<IBot>; totalStorage: number }, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['bot']
    }),
    updateBot: build.mutation<{ data: WithId<IBot>; totalStorage: number }, { id: string; body: Partial<IBot> }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['bot', 'bots']
    }),
    deleteBot: build.mutation<IResponse<WithId<IBot>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['bots']
    }),
    getAllThread: build.query({
      query: params => ({
        url: '/threads/get-all',
        params
      })
    }),
    getThreadMessages: build.query({
      query: threadId => ({
        url: `/threads/messages/${threadId}`
      })
    })
  })
})

export const {
  useGetBotsQuery,
  useCreateBotMutation,
  useGetBotQuery,
  useUpdateBotMutation,
  useDeleteBotMutation,
  useGetAllThreadQuery,
  useGetThreadMessagesQuery
} = botsApi
