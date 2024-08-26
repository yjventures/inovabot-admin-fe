import { IFile } from '@/components/reusable/cards/file-card'
import api from '@/redux/api'
import { IParams } from '@/types/common/IParams'
import { IResponseWithMeta } from '@/types/common/IResponse'

const rootApi = '/bots'

const knowledgeBaseApi = api.injectEndpoints({
  endpoints: build => ({
    uploadKnowledgeBase: build.mutation({
      query: body => ({
        url: `${rootApi}/upload`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['knowledgeBases']
    }),
    getAllBotFiles: build.query<IResponseWithMeta<IFile[]>, IParams & { bot_id: string; company_id?: string }>({
      query: params => ({
        url: `/files/get-all`,
        params
      }),
      providesTags: ['knowledgeBases']
    }),
    deleteBotFile: build.mutation<{}, { bot_id: string; file_id: string }>({
      query: body => ({
        url: `${rootApi}/delete-file`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['knowledgeBases']
    })
  })
})

export const { useUploadKnowledgeBaseMutation, useGetAllBotFilesQuery, useDeleteBotFileMutation } = knowledgeBaseApi
