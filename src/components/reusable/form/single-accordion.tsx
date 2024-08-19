import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  value: string
  label: string
  className?: string
}

export default function SingleAccordion({ children, value, label, className }: Props) {
  return (
    <Accordion type='single' defaultValue={value} collapsible className={cn('w-full', className)}>
      <AccordionItem value={value} className='border-b-0'>
        <AccordionTrigger>{label}</AccordionTrigger>
        <AccordionContent className='p-1'>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
