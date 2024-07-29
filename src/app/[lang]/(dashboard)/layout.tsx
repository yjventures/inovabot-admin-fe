import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return <div>{children}</div>
}
