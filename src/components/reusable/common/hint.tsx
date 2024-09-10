import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { HelpCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Hint({ children }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {' '}
        <HelpCircle className='size-4 text-text-gray' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='max-w-80'>
          <p className='text-text-gray text-sm font-medium'>{children}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
