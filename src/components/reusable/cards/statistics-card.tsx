import Typography from '@/components/ui/typography'
import { ChevronUp, LucideProps } from 'lucide-react'
import CardWrapper from './commonn/card-wrapper'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import CardIcon from './commonn/card-icon'

interface Props {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  title: string
  number: string
  iconGradientClassName?: string
}

export default function StatisticsCard({ icon: Icon, title, number, iconGradientClassName }: Props) {
  return (
    <CardWrapper>
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          <p className='text-base font-medium text-text-secondary'>{title}</p>
          <Typography variant='h3' className='font-medium'>
            {number || 0}
          </Typography>
        </div>
        <CardIcon iconGradientClassName={iconGradientClassName} icon={Icon} />
      </div>

      <p className='text-text-primary-muted mt-4'>+20 today</p>
    </CardWrapper>
  )
}
