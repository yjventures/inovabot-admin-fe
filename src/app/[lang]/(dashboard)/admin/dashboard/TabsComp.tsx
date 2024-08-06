'use client'

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
  return (
    <>
      <Toggles options={options} activeTab={activeTab} setactiveTab={setactiveTab} />
    </>
  )
}
