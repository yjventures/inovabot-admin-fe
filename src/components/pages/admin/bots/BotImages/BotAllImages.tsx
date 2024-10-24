'use client'

import FormWrapper from '@/components/reusable/form/form-wrapper'
import Typography from '@/components/ui/typography'
import { useParams } from 'next/navigation'
import BotsImageAddForm from './BotsImagesComp/BotsImageAddForm'
import ViewBotsImages from './BotsImagesComp/ViewBotsImages'

export default function BotAllImages() {
  const { id } = useParams()
  return (
    <>
      <FormWrapper>
        <BotsImageAddForm id={id as string} />
      </FormWrapper>
      <Typography variant='h4' className='mt-6'>
        All Images
      </Typography>
      <ViewBotsImages id={id as string} limit={4} />
    </>
  )
}
