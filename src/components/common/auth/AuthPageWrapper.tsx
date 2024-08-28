import bg from '@/assets/images/pages/auth/signup-hero.png'
import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  formPosition?: 'left' | 'right'
}

export default function AuthPageWrapper({ children, formPosition = 'right' }: Props) {
  return (
    <main className='flex h-screen items-center bg-background'>
      <div
        className={cn('hidden lg:block w-1/2 h-screen p-6', {
          'order-2': formPosition === 'left',
          'order-1': formPosition === 'right'
        })}
      >
        <Img src={bg} alt='Auth' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div
        className={cn('w-full lg:w-1/2 flex flex-col items-center justify-center px-5 lg:p-6', {
          'order-1': formPosition === 'left',
          'order-2': formPosition === 'right'
        })}
      >
        {children}
      </div>
    </main>
  )
}
