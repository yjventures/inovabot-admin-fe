import { API_URL } from '@/configs'
import axios from 'axios'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    //toast.success('Uploading file, please wait...')
    const response = await axios.post(`${API_URL}/users/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response?.data?.status) {
      //toast.success('File uploaded successfully!')
      return response?.data?.uploadedUrl
    }
  } catch (error) {
    console.error('Error uploading file', error)
    return error
  }
}
