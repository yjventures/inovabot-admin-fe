import api from '@/redux/api'
import { apiURL } from '../utils'
import { ICategory } from '@/types/ICategory'
import { IResponse, WithId } from '@/types/common/IResponse'

const rootApi = '/categories'

const categoriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query<{ categories: WithId<ICategory>[] }, {}>({
      query: () => ({
        url: apiURL(rootApi)
      }),
      providesTags: ['categories']
    }),
    createCategory: build.mutation({
      query: body => ({
        url: apiURL(rootApi, 'create'),
        method: 'POST',
        body
      }),
      invalidatesTags: ['categories']
    }),
    getCategory: build.query<IResponse<ICategory>, string>({
      query: id => ({
        url: apiURL(rootApi, 'get', id)
      }),
      providesTags: ['category']
    }),
    updateCategory: build.mutation<{ category: ICategory }, { id: string; body: ICategory }>({
      query: ({ id, body }) => ({
        url: apiURL(rootApi, 'update', id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['category', 'categories']
    }),
    deleteCategory: build.mutation<{}, string>({
      query: id => ({
        url: apiURL(rootApi, 'delete', id),
        method: 'DELETE'
      }),
      invalidatesTags: ['categories']
    })
  })
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation
} = categoriesApi
