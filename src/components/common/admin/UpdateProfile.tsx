'use client'

import avatar from '@/assets/images/common/avatar.png'
import animationData from '@/assets/lottie/imageUploading.json'
import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Overlay from '@/components/ui/overlay'
import Typography from '@/components/ui/typography'
import { useGetUserQuery, useUpdateProfileMutation } from '@/redux/features/usersApi'
import { getUserId } from '@/utils/auth/getUserId'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { uploadFile } from '@/utils/files/uploadFile'
import { ImageUp, UserCog2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UpdateProfile() {
  const { push } = useRouter()
  const params = useSearchParams()
  const prevPath = params.get('prevPath')

  const [isUploading, setIsUploading] = useState(false)
  const inputBtnRef = useRef<HTMLInputElement | null>(null)

  const { data, isSuccess } = useGetUserQuery(getUserId())

  const methods = useForm()
  const { handleSubmit, watch, reset, setValue } = methods

  useEffect(() => {
    if (isSuccess) {
      reset(data?.user)
    }
  }, [data, isSuccess, reset])

  const imageVal = watch('image')

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const files = e.target.files
    if (files?.length) {
      uploadFileFn(files[0])
    }
  }

  const uploadFileFn = async (file: File) => {
    try {
      setIsUploading(true)
      const fileURL = await uploadFile(file)
      if (typeof fileURL === 'string') {
        setValue('image', fileURL, { shouldValidate: true, shouldDirty: true })
      } else if (fileURL.code === 'ERR_NETWORK') {
        toast.error('Network Error, try again!')
      } else {
        toast.error('Something went wrong, try again!')
      }
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    } catch (error) {
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    }
  }

  const [updateProfile, { isLoading: isUpdateLoading, isError, error, isSuccess: isUpdateSuccess }] =
    useUpdateProfileMutation()

  const onSubmit = (data: any) => {
    updateProfile(data)
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success('Profile updated successfully')
      push(prevPath || '/')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isUpdateSuccess, push, prevPath, error, isError])

  return (
    <div className='container py-16'>
      <Typography variant='h3' className='mb-10'>
        Update Profile
      </Typography>
      <div className='inline-flex flex-col items-center justify-center gap-y-3'>
        {imageVal ? (
          <Img src={imageVal} alt={data?.user?.name} className='size-28 object-cover border rounded-full' />
        ) : (
          <Img src={avatar} alt='User' className='size-28 object-cover border rounded-full' />
        )}

        <Button onClick={() => inputBtnRef.current.click()} icon={<ImageUp />} variant='outline' size='sm'>
          Update Image
        </Button>
      </div>
      <input type='file' ref={inputBtnRef} onChange={handleChange} className='hidden' accept='image/*' />

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='mt-10 max-w-md'>
        <Input name='name' label='Name' required />
        <Input name='birthdate' label='Birthdate' type='date' />
        <Button type='submit' variant='gradient' icon={<UserCog2 />} isLoading={isUpdateLoading}>
          Save profile
        </Button>
      </Form>

      <Overlay isOpen={isUploading} animationData={JSON.parse(JSON.stringify(animationData))} />
    </div>
  )
}
