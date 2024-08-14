function methodURL(method: 'get-all' | 'get' | 'create' | 'update' | 'delete'): string {
  return `/${method}`
}

export const apiURL = (
  rootApi: string,
  method: 'get-all' | 'get' | 'create' | 'update' | 'delete' = 'get-all',
  id?: string
): string => {
  const url = `${rootApi}${methodURL(method)}${id ? `/${id}` : ''}`
  return url
}
