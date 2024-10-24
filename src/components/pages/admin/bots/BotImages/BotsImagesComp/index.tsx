'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { useParams } from 'next/navigation'
import BotsImageAddForm from './BotsImageAddForm'
import ViewBotsImages from './ViewBotsImages'

interface Props {
  from?: 'admin' | 'reseller' | 'company'
}
export default function BotsImagesComp({ from = 'admin', ...rest }: Props) {
  const { id } = useParams()
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
      <BotsImageAddForm id={id as string} />
      <ViewBotsImages id={id as string} limit={4} />
    </FormWrapper>
  )
}
