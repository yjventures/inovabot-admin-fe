'use client'

import { Checkbox } from '@/components/reusable/form/checkbox'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { PlusSquare } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateCompanyForm() {
  const push = usePush()
  const methods = useForm()
  const { handleSubmit, reset } = methods
  const onSubmit = (data: any) => {
    console.log(data)
  }

  const discardForm = () => {
    reset()
    push('/admin/companies')
  }

  const [needSubscription, setNeedSubscription] = useState<boolean>(true)

  return (
    <div className='bg-foreground rounded-xl px-4 py-6'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center gap-x-4 g gap-y-2 flex-wrap'>
          <Typography variant='h4'>Compnay Information</Typography>
          <div className='flex items-center gap-x-4 gap-y-2'>
            <Button variant='destructive' onClick={discardForm}>
              Discard
            </Button>
            <Button type='submit' icon={<PlusSquare />} variant='gradient'>
              Save Compnay
            </Button>
          </div>
        </div>
        <Input
          name='email'
          type='email'
          required
          label='Primary contact Email'
          placeholder='Enter primary contact email'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <DnDUpload name='logo' label='Company Logo Light Mode' />
          <DnDUpload name='logo_dark' label='Company Logo Dark Mode' />
        </div>
        <Input name='name' required label='Company Name' placeholder='Enter company name' />
        <Input name='website' type='url' required label='Company Website' placeholder='Enter company website' />
        <Input name='address' type='text' required label='Company Address' placeholder='Enter company address' />
        <Textarea name='description' required label='Short Description' placeholder='Enter company short description' />
      </Form>

      <Checkbox
        checked={needSubscription}
        onCheckedChange={e => setNeedSubscription(e as boolean)}
        label='Need Subscription?'
        id='need-subscription'
      />
    </div>
  )
}
