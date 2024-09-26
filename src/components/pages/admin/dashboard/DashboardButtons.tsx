'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { getDashboardURLPath } from '@/helpers/common'
import { Command, Eye, Plus } from 'lucide-react'

export default function DashboardButtons() {
  return (
    <div className='grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3'>
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

      <LLink href={`${getDashboardURLPath()}/companies/create`}>
        <Button icon={<Plus />} variant='magenta' className='w-full' size='lg'>
          Add a company
        </Button>
      </LLink>

      <LLink href={`${getDashboardURLPath()}/companies`}>
        <Button icon={<Command />} variant='orange' className='w-full' size='lg'>
          Manage Companies
        </Button>
      </LLink>
    </div>
  )
}
