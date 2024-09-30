'use client'

import Typography from '@/components/ui/typography'
import { Loader } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    redirect('/login')
  }, [])
  return (
    <div className='flex items-center justify-center min-h-screen gap-x-3'>
      <Typography variant='h3' className='font-light'>
        Redirecting, please wait
      </Typography>
      <Loader className='animate-spin text-text-heading size-10' />
    </div>
  )
}
