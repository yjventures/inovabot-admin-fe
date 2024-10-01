'use client'

import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className={cn('min-h-screen flex flex-col items-center justify-center gap-y-4 text-center container')}>
      <h1 className='text-9xl font-light text-destructive'>Error</h1>
      <Typography variant='h1' className='font-semibold text-text-secondary'>
        Something went wrong!
      </Typography>
      <p className='text-xl text-text-gray mt-2 mb-4'>{error.message}</p>

      <Button variant='black' onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
