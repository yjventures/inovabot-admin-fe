import api from '@/redux/api'
import { IResponse, IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ITemplate } from '@/types/Itemplate'
import { apiURL } from '../utils'
import { IParams } from './../../types/common/IParams'

const rootApi = '/templates'

const templatesApi = api.injectEndpoints({
  endpoints: build => ({
    getTemplates: build.query<IResponseWithMeta<WithId<ITemplate>[]>, IParams>({
      query: params => ({
        url: apiURL(rootApi),
        params
      }),
      providesTags: ['templates']
    }),
    createTemplate: build.mutation<{ template: WithId<ITemplate> }, ITemplate>({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['templates']
    }),
    getTemplate: build.query<{ template: WithId<ITemplate> }, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['template']
    }),
    updateTemplate: build.mutation<
      { data: WithId<ITemplate>; totalStorage: number },
      { id: string; body: Partial<ITemplate> }
    >({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['template', 'templates']
    }),
    deleteTemplate: build.mutation<IResponse<WithId<ITemplate>>, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['templates']
    })
  })
})

export const {
  useGetTemplatesQuery,
  useCreateTemplateMutation,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation
} = templatesApi
