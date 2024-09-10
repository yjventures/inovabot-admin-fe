'use client'

import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useGetCompanyQuery, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import { ICompany } from '@/types/ICompany'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UpdateCompanyForm() {
  const { id } = useParams()
  const push = usePush()

  const { data, isSuccess: isFetchSuccess } = useGetCompanyQuery(id as string)

  const [updateCompany, { isSuccess, isError, error, isLoading }] = useUpdateCompanyMutation()

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
      reset(data?.data)
    }
  }, [reset, data, isFetchSuccess])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Company updated successfully')
      push('/admin/companies')
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push])

  return (
    <div className='bg-foreground rounded-xl px-4 py-6'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center gap-x-4 g gap-y-2 flex-wrap'>
          <Typography variant='h4'>Update Company Information</Typography>
          <div className='flex items-center gap-x-4 gap-y-2'>
            <Button variant='destructive' onClick={discardForm}>
              Discard
            </Button>
            <Button type='submit' icon={<PencilLine />} variant='gradient' isLoading={isLoading}>
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
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {logoVal ? (
            <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo', null)} aspect='square' />
          ) : (
            <DnDUpload name='logo' text='Company Logo Light Mode' required description='(300 x 300)' />
          )}
          {darkLogoVal ? (
            <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('dark_logo', null)} aspect='square' />
          ) : (
            <DnDUpload name='logo' text='Company Logo Light Mode' description='(300 x 300)' />
          )}
        </div>
        <Input name='name' required label='Company Name' placeholder='Enter company name' />
        <Input name='web_url' type='url' required label='Company Website' placeholder='Enter company website' />
        <Input name='address' type='text' required label='Company Address' placeholder='Enter company address' />
        <Textarea name='description' required label='Short Description' placeholder='Enter company short description' />
      </Form>
    </div>
  )
}
