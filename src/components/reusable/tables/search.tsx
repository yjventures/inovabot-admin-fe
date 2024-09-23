'use client'

import useDebounce from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { InputHTMLAttributes, useEffect, useState } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  searchValue: string
  // eslint-disable-next-line no-unused-vars
  setsearchValue: (value: string) => void
  inputClassName?: string
}

export default function Search({ searchValue, setsearchValue, inputClassName, className, ...props }: Props) {
  const [value, setValue] = useState(searchValue)
  const debouncedSearch = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedSearch !== searchValue) {
      setsearchValue(debouncedSearch)
    }
  }, [debouncedSearch, searchValue, setsearchValue])

  useEffect(() => {
    if (searchValue === '') {
      setValue('')
    }
  }, [searchValue])

  return (
    <div className={cn('relative w-full h-10', className)}>
      <input
        className={cn(
          'flex h-full w-full rounded-full border border-foreground-border bg-foreground px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-text-gray-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-16 pr-8',
          inputClassName
        )}
        value={value}
        onChange={e => setValue(e.target.value)}
        {...props}
      />
      <SearchIcon className='absolute left-8 top-1/2 -translate-y-1/2 text-text-gray-light' />
    </div>
  )
}
