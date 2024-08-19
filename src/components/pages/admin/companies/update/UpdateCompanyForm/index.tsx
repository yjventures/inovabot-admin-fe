'use client'

import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useGetCompanyQuery, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import { ICompany } from '@/types/ICompany'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UpdateCompanyForm() {
  const { id } = useParams()
  const push = usePush()

  const { data, isSuccess: isFetchSuccess } = useGetCompanyQuery(id as string)

  const { email, logo, logo_dark, name, web_url, address, description } = { ...data?.data }

  const [updateCompany, { isSuccess, isError, error }] = useUpdateCompanyMutation()

  const methods = useForm()
  const { handleSubmit, reset, setValue, watch } = methods
  const onSubmit = (data: Partial<ICompany>) => {
    updateCompany({ id: id as string, body: data })
  }

  const logoVal = watch('logo')
  const darkLogoVal = watch('logo_dark')

  const discardForm = () => {
    reset()
    push('/admin/companies')
  }

  useEffect(() => {
    if (isFetchSuccess) {
      setValue('email', email)
      setValue('logo', logo)
      setValue('logo_dark', logo_dark)
      setValue('name', name)
      setValue('web_url', web_url)
      setValue('address', address)
      setValue('description', description)
    }
  }, [address, description, isFetchSuccess, logo, logo_dark, name, setValue, web_url, email])

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
          {logoVal ? (
            <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo', null)} />
          ) : (
            <DnDUpload name='logo' text='Company Logo Light Mode' />
          )}
          {darkLogoVal ? (
            <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('dark_logo', null)} />
          ) : (
            <DnDUpload name='logo' text='Company Logo Light Mode' />
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
