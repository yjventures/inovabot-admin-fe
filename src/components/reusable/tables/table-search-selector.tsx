import React, { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import Search from './search'
import TableSelector, { TableMode } from './table-selector'
import { IParams } from '@/types/common/IParams'
import { cn } from '@/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
  mode: TableMode
  setmode: Dispatch<SetStateAction<TableMode>>
  className?: string
  placeholder?: string
}

export default function TableSearchSelector({
  params,
  setparams,
  mode,
  setmode,
  className,
  placeholder,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-end sm:items-center justify-between gap-x-5 gap-y-3 mb-6',
        className
      )}
      {...props}
    >
      <Search
        searchValue={params.search}
        setsearchValue={val => setparams({ ...params, search: val })}
        className='w-full sm:w-[calc(100%-100px)]'
        placeholder={placeholder || 'Search'}
      />
      <TableSelector mode={mode} setmode={setmode} />
    </div>
  )
}
