import api from '@/redux/api'
import { apiURL } from '../utils'
import { IBot } from '@/types/IBot'
import { IParams } from './../../types/common/IParams'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'

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
    createBot: build.mutation<IResponse<WithId<IBot>>, IBot>({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['bots']
    }),
    getBot: build.query<IResponse<WithId<IBot>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['bot']
    }),
    updateBot: build.mutation<IResponse<WithId<IBot>>, { id: string; body: Partial<IBot> }>({
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
    })
  })
})

export const { useGetBotsQuery, useCreateBotMutation, useGetBotQuery, useUpdateBotMutation, useDeleteBotMutation } =
  botsApi
