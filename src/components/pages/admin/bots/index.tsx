'use client'

import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import Search from '@/components/reusable/tables/search'
import TableSelector, { TableMode } from '@/components/reusable/tables/table-selector'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function AllBots() {
  const tabs = ['All', 'Documents', 'Cooking']
  const [tab, settab] = useState<string>('All')
  const [value, setvalue] = useState<string>('')
  const [mode, setmode] = useState<TableMode>('grid')

  return (
    <div className='mt-10'>
      <div className='flex gap-x-4 items-center justify-between'>
        <div className='flex flex-wrap gap-x-3'>
          {tabs.map((t, index) => (
            <Button
              key={index}
              variant='outline'
              onClick={() => settab(t)}
              className={cn('rounded-full', { 'bg-gray-secondary': tab === t })}
            >
              {t}
            </Button>
          ))}
        </div>
        <div className='flex gap-x-4'>
          <Search searchValue={value} setsearchValue={setvalue} placeholder='Search' />
          <TableSelector mode={mode} setmode={setmode} />
        </div>
      </div>

      <CardGrid className='mt-5'>
        {Array.from({ length: 10 }, (_, index) => (
          <BotCard
            key={index}
            name='Company Name'
            assistant_id='234oh23o423o4323o24j23'
            model='gpt-4o'
            createdAt='2024-06-12T00:00:00.000Z'
          />
        ))}
      </CardGrid>
    </div>
  )
}
