'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { useAddBotImageMutation, useGetBotImagesQuery } from '@/redux/features/botsApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { ImagePlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  from?: 'admin' | 'reseller'
}
export default function BotsImagesComp({ from = 'admin', ...rest }: Props) {
  const { id } = useParams()

  // Adding image to bot
  const initFormData = useMemo(
    () => ({
      image_url: '',
      description: '',
      bot_id: id
    }),
    [id]
  )

  const [addImage, { isLoading, isSuccess, isError, error }] = useAddBotImageMutation()
  const [formData, setformData] = useState(initFormData)

  const handleSubmit = () => {
    addImage(formData)
  }

  const imageVal = formData.image_url

  useEffect(() => {
    if (isSuccess) {
      toast.success('Image added successfully!')
      setformData(initFormData)
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, initFormData])

  // Getting the images
  const { data } = useGetBotImagesQuery(id)
  console.log(data)
  return (
    <FormWrapper {...rest}>
      <DashboardHeading
        title='Images'
        variant='h5'
        extra={
          <LLink href={`/${from}/bots/update/${id}/images`}>
            <Button variant='black'>View All</Button>
          </LLink>
        }
      />

      <div className='flex gap-x-5 flex-col md:flex-row gap-y-3 justify-between'>
        <div className='md:max-w-md w-full md:w-2/5'>
          {imageVal ? (
            <ImagePreviewer onClick={() => setformData({ ...formData, image_url: undefined })} imgSrc={imageVal} />
          ) : (
            <DnDUpload
              accept='image/*'
              containerClassName='w-full'
              required
              buttonLabel='Select Image'
              cb={e => {
                setformData({ ...formData, image_url: e })
              }}
            />
          )}

          <Textarea label='Objective' placeholder='Objective' />
          <Button variant='gradient' icon={<ImagePlus />} isLoading={isLoading} onClick={handleSubmit}>
            Add Image
          </Button>
        </div>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 w-full md:w-3/5 items-start'></div>
      </div>
    </FormWrapper>
  )
}
