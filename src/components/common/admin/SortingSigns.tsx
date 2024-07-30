import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type Params<T> = T & { sortBy: string; sortOrder: 'asc' | 'desc' }

interface Props<T> {
  params: Params<T>
  setparams: Dispatch<SetStateAction<Params<T>>>
  sortField: string
}

export default function SortingSigns<T>({ params, setparams, sortField }: Props<T>) {
  return (
    <>
      {params.sortBy === sortField ? (
        <>
          {params.sortOrder === 'asc' ? (
            <ArrowUp
              className='size-4 cursor-pointer'
              onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'desc' })}
            />
          ) : (
            <ArrowDown
              className='size-4 cursor-pointer'
              onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'asc' })}
            />
          )}
        </>
      ) : (
        <ArrowUpDown
          className='size-4 cursor-pointer'
          onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'asc' })}
        />
      )}
    </>
  )
}
