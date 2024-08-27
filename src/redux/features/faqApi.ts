import api from '@/redux/api'
import { apiURL } from '../utils'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { IFAQ } from '@/components/pages/admin/bots/UpdateBotForm/FAQ'

const rootApi = '/faqs'

const faqApi = api.injectEndpoints({
  endpoints: build => ({
    getFAQs: build.query<IResponseWithMeta<WithId<IFAQ>[]>, {}>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['faqs']
    }),
    createFAQ: build.mutation({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['faqs']
    }),
    getFAQ: build.query<{ faq: IFAQ }, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['faq']
    }),
    updateFAQ: build.mutation<{ faq: IFAQ }, { id: string; body: Partial<IFAQ> }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['faq', 'faqs']
    }),
    deleteFAQ: build.mutation<{}, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['faqs']
    })
  })
})

export const { useGetFAQQuery, useGetFAQsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation } =
  faqApi
