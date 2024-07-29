import { AxiosError } from 'axios'

export const errorMessage = (error: Error): string => {
  if (error instanceof AxiosError) {
    console.error(error?.response?.data?.message)
    return error?.response?.data?.message
  } else {
    console.error(errorMessage(error))
    return errorMessage(error)
  }
}

export const rtkErrorMessage = (error: any): string => {
  console.error(error?.data?.message || error.message)
  return error?.data?.message || error.message
}
