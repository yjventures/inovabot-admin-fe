'use client'

import Typography from '@/components/ui/typography'
import { API_URL, LANDING_URL } from '@/configs'
import usePush from '@/hooks/usePush'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { Loader } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function CheckToken() {
  const push = usePush()
  const [isLoading, setisLoading] = useState(true)
  const params = useSearchParams()

  const checkTokenFn = useCallback(async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { type: 'refresh', refreshToken: params.get('token') })
      if (res.status === 200) {
        setisLoading(false)
        const { refreshToken, accessToken, ...userData } = res?.data?.user || {}
        if (refreshToken && accessToken) {
          setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
          setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })
        }
        setCookie('userData', JSON.stringify(userData), {
          maxAge: calculateTokenExpiration(refreshToken)
        })
        const userRole = res?.data?.user?.type
        if (['super-admin', 'admin'].includes(userRole)) {
          push('/admin/dashboard')
        } else if (['company-admin', 'user'].includes(userRole)) {
          push('/company/dashboard')
        } else if (userRole === 'reseller') {
          push('/reseller/dashboard')
        }
      }
    } catch (error) {
      setisLoading(false)
      console.error(error)
      push('/login')
    }
  }, [params, push])

  useEffect(() => {
    if (params.has('token')) {
      checkTokenFn()
    } else {
      if (params.has('to') && params.get('to') === 'logout') {
        redirect(`${LANDING_URL}/logout`)
      }
    }
  }, [params, push, checkTokenFn])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen gap-x-3'>
        <Typography variant='h3' className='font-light'>
          Please wait
        </Typography>
        <Loader className='animate-spin text-text-heading size-10' />
      </div>
    )
  }
  return (
    <div className='flex items-center justify-center min-h-screen gap-x-3'>
      <Typography variant='h3' className='font-light'>
        Redirecting, please wait
      </Typography>
      <Loader className='animate-spin text-text-heading size-10' />
    </div>
  )
}
