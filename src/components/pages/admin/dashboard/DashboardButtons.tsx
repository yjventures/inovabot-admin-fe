'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { getDashboardURLPath, getUserRole } from '@/helpers/common'
import { cn } from '@/lib/utils'
import { Command, Eye, Plus } from 'lucide-react'

export default function DashboardButtons() {
  const isCompany = ['editor', 'viewer'].includes(getUserRole())
  return (
    <div
      className={cn('grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3', {
        'md:grid-cols-3': isCompany
      })}
    >
      <LLink href={`${getDashboardURLPath()}/bots/create`}>
        <Button icon={<Plus />} variant='pink' className='w-full' size='lg'>
          Create Bot
        </Button>
      </LLink>

      <LLink href={`${getDashboardURLPath()}/bots`}>
        <Button icon={<Eye />} variant='cyan' className='w-full' size='lg'>
          View Bots
        </Button>
      </LLink>

      {!isCompany && (
        <LLink href={`${getDashboardURLPath()}/companies/create`}>
          <Button icon={<Plus />} variant='magenta' className='w-full' size='lg'>
            Add a company
          </Button>
        </LLink>
      )}

      <LLink href={`${getDashboardURLPath()}/companies`}>
        <Button icon={<Command />} variant='orange' className='w-full' size='lg'>
          Manage Companies
        </Button>
      </LLink>
    </div>
  )
}
