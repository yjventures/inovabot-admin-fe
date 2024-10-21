'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import DnDUploadMultiple from '@/components/reusable/form/dnd-upload-multiple'
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
import BotImageCard from '../BotImageCard'

interface Props {
  from?: 'admin' | 'reseller'
}
export default function BotsImagesComp({ from = 'admin', ...rest }: Props) {
  const { id } = useParams()

  // Adding image to bot
  const initFormData = useMemo(
    () => ({
      image_url: [],
      objective: '',
      bot_id: id
    }),
    [id]
  )

  const [addImage, { isLoading, isSuccess, isError, error }] = useAddBotImageMutation()
  const [formData, setformData] = useState(initFormData)

  const handleSubmit = () => {
    if (!formData.image_url || !formData.objective) return toast.error('Please fill all the fields!')
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
  const { data } = useGetBotImagesQuery({ bot_id: id as string, limit: 4 })
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

      <div className='space-y-3'>
        <div className='w-full flex flex-col md:flex-row gap-x-6 gap-y-3'>
          <DnDUploadMultiple
            accept='image/*'
            maxFiles={20}
            required
            buttonLabel='Select Image'
            cb={e => {
              setformData({ ...formData, image_url: e })
            }}
          />

          <Textarea
            label='Objective*'
            placeholder='Objective'
            value={formData.objective}
            containerClassName='flex-1'
            rows={9}
            onChange={e => setformData({ ...formData, objective: e.target.value })}
          />
        </div>

        <Button variant='gradient' icon={<ImagePlus />} isLoading={isLoading} onClick={handleSubmit}>
          Add Image
        </Button>

        {imageVal.length > 0 && (
          <div className='grid grid-cols-2 gap-x-3'>
            {imageVal.map(img => (
              <ImagePreviewer
                key={img}
                onClick={() => setformData({ ...formData, image_url: imageVal.filter(i => i !== img) })}
                imgSrc={img}
              />
            ))}
          </div>
        )}

        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 w-full items-start pt-6'>
          {data?.data?.map(img => (
            <BotImageCard key={img._id} botImg={img} />
          ))}
        </div>
      </div>
    </FormWrapper>
  )
}
