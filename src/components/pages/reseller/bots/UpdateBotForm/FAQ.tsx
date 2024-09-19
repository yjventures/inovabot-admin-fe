'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { initParams } from '@/constants/form/init-params'
import { useCreateFAQMutation, useGetFAQsQuery } from '@/redux/features/faqApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PlusSquare } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface IFAQ {
  question: string
  objective: string
  active?: boolean
}

const initFaq: IFAQ = {
  question: '',
  objective: '',
  active: true
}

export default function FAQ({ companyId, from = 'admin' }: { companyId: string; from?: 'admin' | 'reseller' }) {
  const { id } = useParams()

  const [faq, setfaq] = useState<IFAQ>(initFaq)

  const [addFAQ, { isLoading, isSuccess, isError, error }] = useCreateFAQMutation()
  const handleSubmit = () => {
    if (!faq.question || !faq.objective) return toast.error('Please fill all the fields!')
    addFAQ({ ...faq, company_id: companyId, bot_id: id as string })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('FAQ added successfully!')
      setfaq(initFaq)
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  const { data } = useGetFAQsQuery({ ...initParams({ limit: 4 }), bot_id: id as string })

  return (
    <FormWrapper>
      <DashboardHeading
        title='FAQ'
        variant='h5'
        extra={
          <LLink href={`/${from}/bots/update/${id}/faq`}>
            <Button variant='black'>View All</Button>
          </LLink>
        }
      />
      <Input
        value={faq.question}
        onChange={e => setfaq({ ...faq, question: e.target.value })}
        placeholder='Question'
        label='Question*'
      />
      <Textarea
        value={faq.objective}
        onChange={e => setfaq({ ...faq, objective: e.target.value })}
        placeholder='Objective'
        label='Objective*'
      />
      <Button variant='gradient' icon={<PlusSquare />} onClick={handleSubmit} isLoading={isLoading}>
        Publish FAQ
      </Button>

      <Accordion type='single' collapsible className='mt-8'>
        {data?.data?.map((faq, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index} className='border-b-0'>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.objective}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FormWrapper>
  )
}
