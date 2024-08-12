import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ThreeDots from '@/components/ui/three-dots'
import { PopoverProps } from '@radix-ui/react-popover'
import { ReactNode } from 'react'

interface Props extends PopoverProps {
  children: ReactNode
  className?: string
}

export default function CardPopover({ children, className, ...props }: Props) {
  return (
    <Popover {...props}>
      <PopoverTrigger>
        <ThreeDots className='absolute right-2 top-3' />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
