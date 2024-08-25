interface InitParams {
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const initParams = ({ limit = 2, sortBy = 'createdAt', sortOrder = 'asc' }: InitParams) => ({
  page: 1,
  limit: limit,
  sortBy: sortBy,
  sortOrder: sortOrder,
  search: ''
})
