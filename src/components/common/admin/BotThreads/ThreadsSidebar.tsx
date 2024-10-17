'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetAllThreadQuery } from '@/redux/features/botsApi'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  currThread: undefined | string
  setcurrThread: Dispatch<SetStateAction<undefined | string>>
}

export default function ThreadsSidebar({ currThread, setcurrThread }: Props) {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useGetAllThreadQuery({ bot_id: id as string })
  return (
    <div className='w-60 bg-gray-secondary h-[calc(100vh_-_124px)] overflow-y-auto'>
      {isLoading && (
        <div className='space-y-2'>
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} className='h-10 w-full rounded-lg' />
          ))}
        </div>
      )}
      {isSuccess &&
        (data?.data?.length ? (
          <div className='space-y-2 px-2'>
            {data.data.map(thread => (
              <p
                key={thread._id}
                className={cn('w-full py-2 rounded-lg px-3', {
                  'bg-gray-300 dark:bg-gray-500': thread?._id === currThread
                })}
                onClick={() => setcurrThread(thread._id)}
              >
                {thread.name || 'No Name'}
              </p>
            ))}
          </div>
        ) : (
          <p>No Threads</p>
        ))}
    </div>
  )
}
