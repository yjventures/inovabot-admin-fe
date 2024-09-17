import { Skeleton } from '@/components/ui/skeleton'
import CardGrid from '../commonn/card-grid'

export interface CardSkeletonsProps {
  isLoading: boolean
  className?: string
}

export default function TemplateCardSkeletons({ isLoading, className }: CardSkeletonsProps) {
  return (
    <>
      {isLoading ? (
        <CardGrid className={className} total={3}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className='w-full h-40' />
          ))}
        </CardGrid>
      ) : null}
    </>
  )
}
