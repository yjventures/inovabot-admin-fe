'use client'

import Search from '@/components/reusable/tables/search'
import TablePagination from '@/components/reusable/tables/table-pagination'
import TableSelector, { TableMode } from '@/components/reusable/tables/table-selector'
import Toggles from '@/components/reusable/tables/toggles'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const options = [
  { label: 'Overview', value: 'overview' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Reports', value: 'reports' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Settings', value: 'settings' }
]

export default function TabsComp() {
  const [activeTab, setactiveTab] = useState('overview')
  const [searchValue, setsearchValue] = useState('')
  const [mode, setmode] = useState<TableMode>('list')

  const [params, setparams] = useState({
    page: 1,
    limit: 10
  })

  return (
    <>
      <div className='flex flex-wrap items-center justify-between py-10 gap-x-3 gap-y-2'>
        <Toggles options={options} activeTab={activeTab} setactiveTab={setactiveTab} />
        <div className='flex flex-wrap items-center justify-between py-10 gap-x-3 gap-y-2'>
          <Search searchValue={searchValue} setsearchValue={setsearchValue} placeholder='Search' />
          <TableSelector mode={mode} setmode={setmode} />
        </div>
      </div>
      <TablePagination
        params={params}
        setparams={setparams}
        metadata={{
          totalDocuments: 500,
          currentPage: 20,
          totalPages: 50
        }}
      />
      <Button variant='gradient'>Hello</Button>
    </>
  )
}
