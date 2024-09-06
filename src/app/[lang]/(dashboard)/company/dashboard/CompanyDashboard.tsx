'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function CompanyDashboard() {
  useEffect(() => {
    redirect('/company/details')
  }, [])
  return <div>CompanyDashboard</div>
}
