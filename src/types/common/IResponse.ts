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

export type WithId<T> = T & {
  _id: string
}
