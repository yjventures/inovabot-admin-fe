import { Skeleton } from '@/components/ui/skeleton'
import { HTMLAttributes } from 'react'
import CardGrid from '../commonn/card-grid'

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  className?: string
}

export default function StatisticsCardSkeletons({ isLoading, className, ...rest }: Props) {
  return (
    isLoading && (
      <CardGrid total={4} className={className} {...rest}>
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className='w-full h-40' />
        ))}
      </CardGrid>
    )
  )
}
