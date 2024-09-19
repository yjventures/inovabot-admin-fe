'use client'

import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useCreateCompanyMutation } from '@/redux/features/companiesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PlusSquare } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreateResellerCompanyForm() {
  const push = usePush()
  const methods = useForm()
  const { handleSubmit, reset, watch, setValue } = methods

  const logoVal = watch('logo')
  const darkLogoVal = watch('logo_dark')
  const [createCompany, { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError, error, data: createData }] =
    useCreateCompanyMutation()

  const onSubmit = (data: any) => {
    createCompany(data)
  }

  const discardForm = () => {
    reset()
    push('/reseller/companies')
  }

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success('Company created successfully')
      push(`/reseller/companies/subscription?companyId=${createData?.company?._id}`)
    }

    if (isError) {
      toast.error(rtkErrorMessage(error))
      reset()
    }
  }, [isCreateSuccess, isError, error, reset, push, createData])

  return (
    <div className='bg-foreground rounded-xl px-4 py-6'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center gap-x-4 g gap-y-2 flex-wrap mb-2'>
          <Typography variant='h4'>Compnay Information</Typography>
          <div className='flex items-center gap-x-4 gap-y-2'>
            <Button variant='destructive' onClick={discardForm}>
              Discard
            </Button>
            <Button type='submit' icon={<PlusSquare />} variant='gradient' isLoading={isCreateLoading}>
              Create Compnay
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
            <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo', '')} aspect='square' />
          ) : (
            <DnDUpload name='logo' label='Company Logo Light Mode' required description='(300 x 300)' />
          )}

          {darkLogoVal ? (
            <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('logo_dark', '')} aspect='square' />
          ) : (
            <DnDUpload name='logo_dark' label='Company Logo Dark Mode' description='(300 x 300)' />
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
