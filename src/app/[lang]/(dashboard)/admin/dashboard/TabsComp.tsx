'use client'

import Search from '@/components/reusable/tables/search'
import TableSelector, { TableMode } from '@/components/reusable/tables/table-selector'
import Toggles from '@/components/reusable/tables/toggles'
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

  return (
    <>
      <Toggles options={options} activeTab={activeTab} setactiveTab={setactiveTab} />
      <Search searchValue={searchValue} setsearchValue={setsearchValue} placeholder='Search' />
      <TableSelector mode={mode} setmode={setmode} />
    </>
  )
}
