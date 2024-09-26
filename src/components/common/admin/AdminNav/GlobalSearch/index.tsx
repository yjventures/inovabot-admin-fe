'use client'

import useDebounce from '@/hooks/useDebounce'
import { useDashboardSearchQuery } from '@/redux/features/dashboardsApi'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import GlobalSearchCard from './GlobalSearchCard'

export default function GlobalSearch() {
  const [search, setsearch] = useState<string>('')
  const debouncedVal = useDebounce(search, 750)

  const { data, isSuccess } = useDashboardSearchQuery(debouncedVal)

  console.log(debouncedVal)

  const [showResults, setshowResults] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess && data.length) {
      setshowResults(true)
    } else {
      const timeoutId = setTimeout(() => {
        setshowResults(false)
      }, 50) // Adjust the delay as needed to avoid the flickering effect

      return () => clearTimeout(timeoutId)
    }
  }, [data, isSuccess, debouncedVal])

  console.log(data)
  return (
    <div className='hidden md:flex items-center gap-2 w-1/2 max-w-96 p-2 bg-gray50-foreground rounded-full border-gray50-border'>
      <label htmlFor='search'>
        <Search />
      </label>
      <input
        id='search'
        className='w-full outline-none bg-background'
        placeholder='Search'
        value={search}
        onChange={e => setsearch(e.target.value)}
      />

      {showResults && (
        <div className='fixed top-20 left-5 lg:left-72 w-full max-w-md shadow-lg max-h-[calc(100vh_-_20rem)] overflow-y-auto border bg-background rounded-lg'>
          <div className='p-3 flex flex-col gap-y-2'>
            {data.map((d: any) => (
              <GlobalSearchCard key={d.id} data={d} closeResults={() => setshowResults(false)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
