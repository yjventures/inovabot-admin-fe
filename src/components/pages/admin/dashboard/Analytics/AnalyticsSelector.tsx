import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'
import { AnalyticsParams } from '.'

const times = [
  { label: 'All Date', value: undefined },
  { label: '12 Months', value: '12months' },
  { label: '30 Days', value: '30days' },
  { label: '7 Days', value: '7days' },
  { label: '24 Hours', value: '24hours' }
]

interface Props {
  params: AnalyticsParams
  setparams: Dispatch<SetStateAction<AnalyticsParams>>
}

export default function AnalyticsSelector({ params, setparams }: Props) {
  return (
    <div className='flex flex-wrap gap-1 border rounded-lg p-1 shadow-sm bg-foreground'>
      {times.map(time => (
        <Button
          key={time.value}
          size='sm'
          onClick={() => setparams({ ...params, filter: time.value })}
          variant={params.filter === time.value ? 'secondary' : 'unstyled'}
          className='h-8 rounded-md px-3'
        >
          {time.label}
        </Button>
      ))}
    </div>
  )
}
