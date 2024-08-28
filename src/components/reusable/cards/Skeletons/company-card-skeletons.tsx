import React from 'react'
import CardGrid from '../commonn/card-grid'
import { Skeleton } from '@/components/ui/skeleton'

export default function CompanyCardSkeletons({ className }: { className?: string }) {
  return (
    <CardGrid className={className}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className='w-full h-80' />
      ))}
    </CardGrid>
  )
}
