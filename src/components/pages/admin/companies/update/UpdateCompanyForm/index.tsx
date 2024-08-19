'use client'

import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useGetCompanyQuery, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UpdateCompanyForm() {
  const { id } = useParams()
  const push = usePush()

  const { data } = useGetCompanyQuery(id as string)

  const { email, logo, logo_dark, name, web_url, address, description } = { ...data?.compnay }

  const [UpdateCompany, { isSuccess, isError, error }] = useUpdateCompanyMutation()

  const methods = useForm()
  const { handleSubmit, reset, setValue } = methods
  const onSubmit = (data: any) => {
    UpdateCompany({ id: id as string, body: data })
  }

  const discardForm = () => {
    reset()
    push('/admin/companies')
  }

  useEffect(() => {
    if (isSuccess) toast.success('Company updated successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  return (
    <div className='bg-foreground rounded-xl px-4 py-6'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center gap-x-4 g gap-y-2 flex-wrap'>
          <Typography variant='h4'>Update Compnay Information</Typography>
          <div className='flex items-center gap-x-4 gap-y-2'>
            <Button variant='destructive' onClick={discardForm}>
              Discard
            </Button>
            <Button type='submit' icon={<PencilLine />} variant='gradient'>
              Update Compnay
            </Button>
          </div>
        </div>
        <Input
          name='email'
          type='email'
          required
          label='Primary contact Email'
          placeholder='Enter primary contact email'
          defaultValue={email}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {logo ? (
            <div className='aspect-video rounded-lg overflow-hidden relative'>
              <Img src={logo} alt={name!} className='w-full h-full object-cover' />
              <div className='absolute top-1 right-1 bg-red-500 rounded-full p-0.5 cursor-pointer'>
                <X className='text-white' onClick={() => setValue('logo', null)} />
              </div>
            </div>
          ) : (
            <DnDUpload name='logo' label='Company Logo Light Mode' />
          )}

          {logo_dark ? (
            <div className='aspect-video rounded-lg overflow-hidden relative'>
              <Img src={logo_dark} alt={name!} className='w-full h-full object-cover' />
              <div className='absolute top-1 right-1 bg-red-500 rounded-full p-0.5 cursor-pointer'>
                <X className='text-white' onClick={() => setValue('logo_dark', null)} />
              </div>
            </div>
          ) : (
            <DnDUpload name='logo' label='Company Logo Dark Mode' />
          )}
        </div>
        <Input name='name' required label='Company Name' placeholder='Enter company name' defaultValue={name} />
        <Input
          name='web_url'
          type='url'
          required
          label='Company Website'
          placeholder='Enter company website'
          defaultValue={web_url}
        />
        <Input
          name='address'
          type='text'
          required
          label='Company Address'
          placeholder='Enter company address'
          defaultValue={address}
        />
        <Textarea
          name='description'
          required
          label='Short Description'
          placeholder='Enter company short description'
          defaultValue={description}
        />
      </Form>
    </div>
  )
}
