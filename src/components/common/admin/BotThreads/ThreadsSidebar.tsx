'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetAllThreadQuery } from '@/redux/features/botsApi'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface Props {
  currThread: undefined | string
  setcurrThread: Dispatch<SetStateAction<undefined | string>>
  threadSidebarOpen: boolean
  setthreadSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function ThreadsSidebar({ currThread, setcurrThread, threadSidebarOpen }: Props) {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useGetAllThreadQuery({ bot_id: id as string })

  useEffect(() => {
    if (isSuccess) setcurrThread(data?.data?.[0]?._id)
  }, [isSuccess, data, setcurrThread])

  return (
    <div
      className={cn(
        'w-60 bg-gray-secondary h-[calc(100vh_-_80px)] overflow-y-auto fixed transition-all duration-300 py-3 z-30',
        {
          'w-0 overflow-hidden': !threadSidebarOpen
        }
      )}
    >
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
                className={cn('w-full py-2.5 rounded-lg px-3 cursor-pointer text-sm font-medium whitespace-nowrap', {
                  'bg-gray-300 dark:bg-gray-500': thread?._id === currThread
                })}
                onClick={() => setcurrThread(thread._id)}
              >
                {thread.name || 'Untitled Chat'}
              </p>
            ))}
          </div>
        ) : (
          <p>No Threads</p>
        ))}
    </div>
  )
}
