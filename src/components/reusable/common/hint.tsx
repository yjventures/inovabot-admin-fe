import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Hint({ children }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className='size-4 ml-1.5 text-text-gray' />
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-text-gray text-sm font-medium'>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
