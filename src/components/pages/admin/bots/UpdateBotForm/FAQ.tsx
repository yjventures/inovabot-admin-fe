'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LLink from '@/components/ui/llink'
import { useCreateFAQMutation, useGetFAQsQuery } from '@/redux/features/faqApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { initParams } from '@/constants/form/init-params'

export interface IFAQ {
  question: string
  answer: string
}

const initFaq: IFAQ = {
  question: '',
  answer: ''
}

export default function FAQ({ companyId }: { companyId: string }) {
  const { id } = useParams()

  const [faq, setfaq] = useState<IFAQ>(initFaq)

  const [addFAQ, { isLoading, isSuccess, isError, error }] = useCreateFAQMutation()
  const handleSubmit = () => {
    if (!faq.question || !faq.answer) return toast.error('Please fill all the fields!')
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
        variant='h4'
        extra={
          <LLink href={`/admin/bots/update/${id}/faq`}>
            <Button variant='black'>View All</Button>
          </LLink>
        }
      />
      <Input
        value={faq.question}
        onChange={e => setfaq({ ...faq, question: e.target.value })}
        placeholder='Question'
        label='Question'
      />
      <Input
        value={faq.answer}
        onChange={e => setfaq({ ...faq, answer: e.target.value })}
        placeholder='Answer'
        label='Answer'
      />
      <Button variant='gradient' icon={<PlusSquare />} onClick={handleSubmit} isLoading={isLoading}>
        Publish FAQ
      </Button>

      <Accordion type='single' collapsible className='mt-8'>
        {data?.data?.map((faq, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index} className='border-b-0'>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FormWrapper>
  )
}
