import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { formateDate } from '@/utils/date/formateDate'
import React, { ReactNode } from 'react'
import Badge from './badge'

interface Props {
  topCTASection?: React.ReactNode
  name: string
  logo?: string
  web_url?: string
  address?: string
  payment_status: boolean
  createdAt: string
  expires_at: string
  description: string
  gradientClassName?: string
  className?: string
  extra?: ReactNode
}

export default function CompanyIntoCard({
  topCTASection,
  name,
  logo,
  web_url,
  address,
  payment_status,
  createdAt,
  expires_at,
  description,
  gradientClassName,
  className,
  extra
}: Props) {
  return (
    <section className={cn('p-2 bg-foreground rounded-lg border border-border-primary', className)}>
      <div
        className={cn(
          'w-full min-h-24 bg-gradient-to-b from-cyan-dark to-emerald-primary flex items-end justify-end relative rounded-lg',
          gradientClassName
        )}
      >
        <div className='my-4 mr-4 z-10 max-w-full w-2/3 ml-auto flex flex-wrap gap-x-3 gap-y-2 items-center justify-end'>
          {topCTASection}
        </div>
      </div>

      <div className='flex flex-wrap sm:flex-nowrap gap-x-3 mt-0 sm:-mt-16 z-10 isolate p-2 sm:p-4'>
        <div className='size-36 min-w-36 rounded-full overflow-hidden bg-foreground border'>
          {logo ? (
            <Img src={logo} alt={name} className='size-full aspect-square object-cover' />
          ) : (
            <Img src={companyPlaceholder} alt={name} className='size-full aspect-square object-cover' />
          )}
        </div>

        <div className='w-full flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mt-4 sm:mt-16'>
          <div className='space-y-1'>
            <p className='text-xl text-text-heading font-semibold'>{name}</p>
            {web_url && (
              <a
                href={web_url}
                target='_blank'
                className='text-sm text-blue-dark font-bold hover:underline pt-1 inline-block'
              >
                {web_url}
              </a>
            )}
            <p className='text-sm text-text-gray-light font-semibold'>{address}</p>
          </div>

          <div className='space-y-1'>
            <p className='text-sm text-text-gray-light'>Status</p>
            {payment_status ? <Badge variant='emerald'>Paid</Badge> : <Badge variant='error'>Unpaid</Badge>}
          </div>

          <div className='space-y-1'>
            <p className='text-sm text-text-gray-light'>Expires At</p>
            <p className='text-sm font-semibold'>{expires_at ? formateDate(expires_at, true) : 'N/A'}</p>
          </div>

          <div className='space-y-1'>
            <p className='text-sm text-text-gray-light'>Created</p>
            <p className='text-sm font-semibold'>{formateDate(createdAt, true)}</p>
          </div>

          {/* <div className='flex items-center gap-x-2'>
            <Flag fill='currentColor' size={20} className='text-text-gray-light' />
            <Share2 fill='currentColor' size={20} className='text-text-gray-light' />
          </div> */}
        </div>
      </div>

      <p className='text-sm mb-2 sm:mb-4 mx-2 sm:mx-4 mt-2'>{description}</p>
      {extra}
    </section>
  )
}
