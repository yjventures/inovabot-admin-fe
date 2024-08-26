import api from '@/redux/api'

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
    })
  })
})

export const { useUploadKnowledgeBaseMutation } = knowledgeBaseApi
