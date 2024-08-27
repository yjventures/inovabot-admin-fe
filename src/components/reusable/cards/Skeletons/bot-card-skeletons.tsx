import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import CardGrid from '../commonn/card-grid'

interface Props {
  isLoading: boolean
  className?: string
}

export default function BotCardSkeletons({ isLoading, className }: Props) {
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
