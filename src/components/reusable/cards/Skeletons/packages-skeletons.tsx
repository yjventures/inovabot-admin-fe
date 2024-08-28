import React from 'react'
import { CardSkeletonsProps } from './company-card-skeletons'
import { Skeleton } from '@/components/ui/skeleton'
import CardGrid from '../commonn/card-grid'

export default function PackagesKkeletons({ isLoading, className }: CardSkeletonsProps) {
  return (
    <div>
      {isLoading ? (
        <CardGrid total='packages' className={className}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='rounded-lg w-full h-96' />
          ))}
        </CardGrid>
      ) : null}
    </div>
  )
}
