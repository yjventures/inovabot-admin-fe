export interface IParams {
  page: number
  limit: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
  search: string
}

export interface IResponse<T> {
  data: T
  message: string
}

export interface IResponseWithMeta<T> {
  data: T
  metadata: IMetadata
  message: string
}

export interface IMetadata {
  page: number
  limit: number
  total: number
}
