'use client'

import { Checkbox } from '@/components/reusable/form/checkbox'
import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
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
  const rememberMe = methods.watch('rememberMe')
  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()
  const onSubmit = (data: any) => {
    login(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged in successfully!')

      const { refreshToken, accessToken, ...userData } = data?.user || {}

      if (refreshToken && accessToken) {
        if (rememberMe) {
          setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
          setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })
          setCookie('userData', JSON.stringify(userData), {
            maxAge: calculateTokenExpiration(refreshToken)
          })
        } else {
          setCookie('refreshToken', refreshToken)
          setCookie('accessToken', accessToken)
          setCookie('userData', JSON.stringify(userData))
        }
      }

      const userRole = data?.user?.type

      if (['super-admin', 'admin'].includes(userRole)) {
        push('/admin/dashboard')
      } else if (['company-admin', 'user'].includes(userRole)) {
        push('/company/dashboard')
      } else if (userRole === 'reseller') {
        push('/reseller/dashboard')
      }
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data, rememberMe])

  return (
    <div className='flex flex-col min-h-screen justify-center items-center max-w-md w-full'>
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} className='max-w-sm w-full'>
        <Typography className='mb-4' variant='h3'>
          Login
        </Typography>
        <Input name='email' label='Email' type='email' placeholder='Enter your email' required />
        <Input name='password' label='Password' placeholder='********' type='password' required />
        <Checkbox name='rememberMe' label='Remember Me' containerClassName='mb-4' />
        <Button type='submit' isLoading={isLoading}>
          Login
        </Button>
      </Form>
    </div>
  )
}
