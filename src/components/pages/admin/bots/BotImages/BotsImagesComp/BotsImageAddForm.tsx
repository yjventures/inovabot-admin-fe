'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import DnDUploadMultiple from '@/components/reusable/form/dnd-upload-multiple'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { useAddBotImageMutation } from '@/redux/features/botsApi'
import { ImagePlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  id: string
}

export default function BotsImageAddForm({ id }: Props) {
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
    if (isError) toast.error('Something went wrong!')
  }, [isSuccess, isError, error, initFormData])

  return (
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
      {imageVal.length > 0 && (
        <CardGrid total={5}>
          {imageVal.map(img => (
            <ImagePreviewer
              key={img}
              onClick={() => setformData({ ...formData, image_url: imageVal.filter(i => i !== img) })}
              imgSrc={img}
            />
          ))}
        </CardGrid>
      )}

      <Button variant='gradient' icon={<ImagePlus />} isLoading={isLoading} onClick={handleSubmit}>
        Add Image
      </Button>
    </div>
  )
}
