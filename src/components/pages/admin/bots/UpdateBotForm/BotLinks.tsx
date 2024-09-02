'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { initParams } from '@/constants/form/init-params'
import { useCreateBotLinkMutation, useGetBotLinksQuery } from '@/redux/features/linksApi'
import { IBotLink } from '@/types/ILink'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PlusSquare } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

export default function BotLinks() {
  const { id } = useParams()

  const initLink = useMemo(
    () => ({
      bot_id: id as string,
      link: '',
      objective: ''
    }),
    [id]
  )

  const [botLink, setbotLink] = useState<IBotLink>(initLink)

  const [addBotLink, { isLoading, isSuccess, isError, error }] = useCreateBotLinkMutation()
  const handleSubmit = () => {
    if (!botLink.link || !botLink.objective) return toast.error('Please fill all the fields!')
    addBotLink(botLink)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot Link added successfully!')
      setbotLink(initLink)
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, initLink])

  const { data } = useGetBotLinksQuery({ ...initParams({ limit: 4 }), bot_id: id as string })

  return (
    <FormWrapper>
      <DashboardHeading
        title='Bot Links'
        variant='h5'
        extra={
          <LLink href={`/admin/bots/update/${id}/botLink`}>
            <Button variant='black'>View All</Button>
          </LLink>
        }
      />
      <Textarea
        value={botLink.link}
        onChange={e => setbotLink({ ...botLink, link: e.target.value })}
        placeholder='https://google.com'
        label='Link*'
      />
      <Textarea
        value={botLink.objective}
        onChange={e => setbotLink({ ...botLink, objective: e.target.value })}
        placeholder='Objective'
        label='Objective*'
      />
      <Button variant='gradient' icon={<PlusSquare />} onClick={handleSubmit} isLoading={isLoading}>
        Publish Bot Link
      </Button>

      <div className='mt-8 space-y-3'>
        {data?.data?.map(botLink => (
          <p className='font-medium break-words break-all' key={botLink?._id}>
            - {botLink.objective} - <span className='text-blue-primary'>{botLink.link}</span>
          </p>
        ))}
      </div>
    </FormWrapper>
  )
}
