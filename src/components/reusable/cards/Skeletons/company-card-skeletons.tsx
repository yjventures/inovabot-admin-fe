import { Skeleton } from '@/components/ui/skeleton'
import CardGrid from '../commonn/card-grid'

export interface CardSkeletonsProps {
  isLoading: boolean
  className?: string
  limit?: number
}

export default function CompanyCardSkeletons({ isLoading, className, limit }: CardSkeletonsProps) {
  return (
    <>
      {isLoading ? (
        <CardGrid className={className}>
          {Array.from({ length: limit || 10 }).map((_, index) => (
            <Skeleton key={index} className='w-full h-80' />
          ))}
        </CardGrid>
      ) : null}
    </>
  )
}
