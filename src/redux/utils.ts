export type APIMethod = 'get-all' | 'get' | 'create' | 'update' | 'delete'

function methodURL(method: APIMethod): string {
  return `/${method}`
}

export const apiURL = (rootApi: string, method: APIMethod = 'get-all', id?: string): string => {
  const url = `${rootApi}${methodURL(method)}${id ? `/${id}` : ''}`
  return url
}
