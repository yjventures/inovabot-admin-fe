/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  options: {
    label: string
    value: string
  }[]
  onChange?: (activeTab: string) => void
  activeTab: string
  setactiveTab: Dispatch<SetStateAction<string>>
  className?: string
  buttonClassName?: string
}

export default function Toggles({
  options,
  onChange = () => {},
  activeTab,
  setactiveTab,
  className,
  buttonClassName
}: Props) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {options.map(option => (
        <Button
          key={option.value}
          onClick={() => {
            setactiveTab(option.value)
            onChange(option.value)
          }}
          variant={activeTab === option.value ? 'secondary' : 'outline'}
          className={cn('rounded-full', buttonClassName)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
