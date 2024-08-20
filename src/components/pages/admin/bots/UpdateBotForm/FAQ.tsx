'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LLink from '@/components/ui/llink'

export const dummyFAQ = [
  {
    _id: '1',
    question: 'What is this chatbot for?',
    answer:
      'This chatbot is designed to assist with various tasks such as answering questions, providing recommendations, and automating routine processes.'
  },
  {
    _id: '2',
    question: 'How do I start a conversation with the chatbot?',
    answer:
      'You can start a conversation by simply typing your question or request in the chat window. The chatbot will respond promptly.'
  },
  {
    _id: '3',
    question: "What should I do if the chatbot doesn't understand my question?",
    answer:
      "If the chatbot doesn't understand your question, try rephrasing it or providing more details. You can also ask for human assistance if needed."
  }
]

export interface IFAQ {
  _id: string
  question: string
  answer: string
}

const initFaq: IFAQ = {
  _id: '',
  question: '',
  answer: ''
}

export default function FAQ() {
  const { id } = useParams()

  const [faq, setfaq] = useState<IFAQ>(initFaq)
  const handleSubmit = () => {
    if (!faq.question || !faq.answer) return toast.error('Please fill all the fields!')

    console.log(faq)
    //TODO: when api will be ready, save the faq to the database with the bot id
  }

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
      <Button variant='gradient' icon={<PlusSquare />} onClick={handleSubmit}>
        Publish FAQ
      </Button>

      <Accordion type='single' collapsible className='mt-8'>
        {dummyFAQ.map((faq, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index} className='border-b-0'>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FormWrapper>
  )
}
