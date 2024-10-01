import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const metadata = { title: '404 | Page not found' }

export default function NotFound() {
  return (
    <div className={cn('min-h-screen flex flex-col items-center justify-center gap-y-4 text-center container')}>
      <h1 className='text-9xl font-light'>404</h1>
      <Typography variant='h1' className='font-semibold text-text-secondary'>
        Page not found
      </Typography>
      <p className='text-xl text-text-gray mt-2 mb-4'>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>

      <Link href='/'>
        <Button variant='black'>&larr; Go to home</Button>
      </Link>
    </div>
  )
}
