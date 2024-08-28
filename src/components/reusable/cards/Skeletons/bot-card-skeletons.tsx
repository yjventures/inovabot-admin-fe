import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import CardGrid from '../commonn/card-grid'
import { CardSkeletonsProps } from './company-card-skeletons'

export default function BotCardSkeletons({ isLoading, className }: CardSkeletonsProps) {
  return (
    <>
      {isLoading ? (
        <CardGrid className={className}>
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} className='w-52 h-72 rounded-lg' />
          ))}
        </CardGrid>
      ) : null}
    </>
  )
}
