import { IParams } from '@/types/common/IParams'
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
  sortField: string
  children: ReactNode
}

export default function TableSorter({ params, setparams, sortField, children, ...props }: Props) {
  return (
    <div className='flex items-center gap-2' {...props}>
      {children}
      {params.sortBy === sortField ? (
        <>
          {params.sortOrder === 'asc' ? (
            <ChevronUp
              className='w-4 h-4 cursor-pointer'
              onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'desc' })}
            />
          ) : (
            <ChevronDown
              className='w-4 h-4 cursor-pointer'
              onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'asc' })}
            />
          )}
        </>
      ) : (
        <ChevronsUpDown
          className='w-4 h-4 cursor-pointer'
          onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'asc' })}
        />
      )}
    </div>
  )
}
