import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'

const times = [
  { label: 'All Date', value: undefined },
  { label: '12 Months', value: '12months' },
  { label: '30 Days', value: '30days' },
  { label: '7 Days', value: '7days' },
  { label: '24 Hours', value: '24hours' }
]

interface Props {
  filter: string
  setfilter: Dispatch<SetStateAction<string>>
}

export default function AnalyticsSelector({ filter, setfilter }: Props) {
  return (
    <div className='flex flex-wrap gap-1 border rounded-lg p-1 shadow-sm bg-foreground'>
      {times.map(time => (
        <Button
          key={time.value}
          size='sm'
          onClick={() => setfilter(time.value)}
          variant={filter === time.value ? 'secondary' : 'unstyled'}
          className='h-8 rounded-md px-3'
        >
          {time.label}
        </Button>
      ))}
    </div>
  )
}
