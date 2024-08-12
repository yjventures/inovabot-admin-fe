function methodURL(method: 'get-all' | 'get' | 'create' | 'update' | 'delete'): string {
  if (method === 'get-all') return '/get-all'
  if (method === 'get') return '/get'
  if (method === 'create') return '/create'
  if (method === 'update') return '/update'
  if (method === 'delete') return '/delete'
  return ''
}

export const apiURL = (
  rootApi: string,
  method: 'get-all' | 'get' | 'create' | 'update' | 'delete' = 'get-all',
  id?: string
): string => {
  const url = `${rootApi}${methodURL(method)}${id ? `/${id}` : ''}`
  return url
}
