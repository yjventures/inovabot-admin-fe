import api from '@/redux/api'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { IBotLink } from '@/types/ILink'
import { apiURL } from '../utils'

const rootApi = '/links'

const linksApi = api.injectEndpoints({
  endpoints: build => ({
    getBotLinks: build.query<IResponseWithMeta<WithId<IBotLink>[]>, {}>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['botLinks']
    }),
    createBotLink: build.mutation({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['botLinks']
    }),
    getBotLink: build.query<{ botLink: IBotLink }, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['botLink']
    }),
    updateBotLink: build.mutation<{ botLink: IBotLink }, { id: string; body: Partial<IBotLink> }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['botLink', 'botLinks']
    }),
    deleteBotLink: build.mutation<{}, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['botLinks']
    })
  })
})

export const {
  useGetBotLinkQuery,
  useGetBotLinksQuery,
  useUpdateBotLinkMutation,
  useDeleteBotLinkMutation,
  useCreateBotLinkMutation
} = linksApi
