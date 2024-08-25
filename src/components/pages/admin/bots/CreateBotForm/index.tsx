'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, PlusSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Form from '@/components/reusable/form/form'
import { IBot } from '@/types/IBot'
import Appearance from './Appearance'
import LLMSettings from './LLMSettings'
import Advanced from './Advanced'
import ChatPreview from '../common/ChatPreview'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { useGetComanyListQuery } from '@/redux/features/companiesApi'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useCreateBotMutation } from '@/redux/features/botsApi'
import toast from 'react-hot-toast'
import usePush from '@/hooks/usePush'
import { rtkErrorMessage } from '@/utils/error/errorMessage'

export default function CreateBotForm() {
  const push = usePush()
  const [open, setOpen] = useState<boolean>(false)
  const [company_id, setcompany_id] = useState('')
  const { data: companyListData } = useGetComanyListQuery({})
  const methods = useForm<IBot>()
  const { handleSubmit } = methods

  const [createBot, { isLoading, isSuccess, isError, error }] = useCreateBotMutation()

  const onSubmit = (data: IBot) => {
    createBot({ ...data, company_id })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot created successfully')
      push('/admin/bots')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push])

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Add an Assistant'
        extra={
          <>
            <Button variant='destructive'>Discard</Button>
            <Button variant='gradient' icon={<PlusSquare />} type='submit' isLoading={isLoading}>
              Publish Agent
            </Button>
          </>
        }
      />

      <div className='flex gap-x-5'>
        <FormWrapper className='w-1/2'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
                {company_id ? companyListData?.data.find(com => com._id === company_id)?.name : 'Select Company...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search Compnay...' />
                <CommandList>
                  <CommandEmpty>No company found.</CommandEmpty>
                  <CommandGroup>
                    {companyListData?.data?.map(com => (
                      <CommandItem
                        key={com?._id}
                        value={com?._id}
                        onSelect={currentValue => {
                          setcompany_id(currentValue === company_id ? '' : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', company_id === com?._id ? 'opacity-100' : 'opacity-0')} />
                        {com?.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Appearance />
          <LLMSettings />
          <Advanced />
        </FormWrapper>
        <div className='w-1/2'>
          <ChatPreview />
        </div>
      </div>
    </Form>
  )
}
