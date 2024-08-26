'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import usePush from '@/hooks/usePush'
import { useLoginMutation } from '@/redux/features/authApi'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { setCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const push = usePush()
  const methods = useForm()
  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()
  const onSubmit = (data: any) => {
    login(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged in successfully!')

      const { refreshToken, accessToken, ...userData } = data?.user || {}

      if (refreshToken && accessToken) {
        setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
        setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })
      }

      setCookie('userData', JSON.stringify(userData), {
        maxAge: calculateTokenExpiration(refreshToken)
      })

      if (data?.user?.type === 'super-admin') {
        push('/admin/dashboard')
      }
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} className='max-w-sm w-full'>
        <Input name='email' label='Email' type='email' required />
        <Input name='password' label='Password' type='password' required />
        <Button type='submit' isLoading={isLoading}>
          Login
        </Button>
      </Form>
    </div>
  )
}
