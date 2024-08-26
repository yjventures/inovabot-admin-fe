import { API_URL } from '@/configs'
import axios from 'axios'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(`${API_URL}/users/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response?.data?.status) {
      return response?.data?.uploadedUrl
    } else {
      console.info({ fileUploadResponse: response })
    }
  } catch (error) {
    console.error('Error uploading file', error)
    return error
  }
}
