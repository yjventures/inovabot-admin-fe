import Badge from '@/components/ui/badge'
import React from 'react'

export default function SamplePage() {
  return (
    <div className='flex flex-col gap-y-4 min-h-screen items-center justify-center'>
      <Badge variant='blue' solid>
        Hello this is a Badge
      </Badge>
      <Badge variant='emerald'>Hello this is a Badge</Badge>
      <Badge variant='cyan' solid>
        Hello this is a Badge
      </Badge>
      <Badge variant='magenta'>Hello this is a Badge</Badge>
      <Badge variant='orange'>Hello this is a Badge</Badge>
      <Badge variant='error'>Hello this is a Badge</Badge>
    </div>
  )
}
