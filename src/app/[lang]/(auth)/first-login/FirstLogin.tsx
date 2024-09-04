'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useCheckTempPasswordMutation } from '@/redux/features/authApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function FirstLogin() {
  const push = usePush()
  const methods = useForm()
  const params = useSearchParams()
  const email = params.has('email') && params.get('email')

  const [checkPassword, { data, isLoading, isSuccess, isError, error }] = useCheckTempPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password checked successfully')
      push(`/set-password?id=${data?._id}`)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  const { handleSubmit } = methods
  const onSubmit = (data: any) => checkPassword({ email, ...data })
  return (
    <div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
        <Typography variant='h4' className='mb-4'>
          Enter Temporary Password
        </Typography>
        <Input name='password' label='Temporary Password' placeholder='********' required type='password' />
        <Button type='submit' variant='gradient' icon={<ChevronRight />} iconPosition='right' isLoading={isLoading}>
          Proceed
        </Button>
      </Form>
    </div>
  )
}
