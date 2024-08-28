import React from 'react'
import CardGrid from '../commonn/card-grid'
import { Skeleton } from '@/components/ui/skeleton'

export interface CardSkeletonsProps {
  isLoading: boolean
  className?: string
}

export default function CompanyCardSkeletons({ isLoading, className }: CardSkeletonsProps) {
  return (
    <>
      {isLoading ? (
        <CardGrid className={className}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className='w-full h-80' />
          ))}
        </CardGrid>
      ) : null}
    </>
  )
}
