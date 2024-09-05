import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { useDeletePackageMutation } from '@/redux/features/packagesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { CheckIcon, PencilLine, Trash2 } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  tier: any
  frequency: any
  className?: string
  showPopover?: boolean
  child?: ReactNode
}

interface Feature {
  name: string
  type: string
  value: string | number
}

function transformFeatures(features: Feature[]) {
  return features.reduce((acc: string[], feature: Feature) => {
    if (feature.type === 'String') {
      acc.push(`${feature.name}: ${feature.value || 'N/A'}`)
    } else if (feature.type === 'Boolean' && feature.value) {
      acc.push(feature.name)
    } else if (feature.type === 'Number') {
      acc.push(`${feature.name}: ${feature.value || 0}`)
    }
    return acc
  }, [])
}

export default function PriceCard({ tier, frequency, className, showPopover = true, child }: Props) {
  const features = transformFeatures(tier?.features)

  const [open, setopen] = useState<boolean>(false)
  const [deletePkg, { isSuccess, isError, error, isLoading }] = useDeletePackageMutation()

  useEffect(() => {
    if (isSuccess) toast.success('Package deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  return (
    <>
      <CardWrapper key={tier?.id} className={cn('pt-6 pb-8 text-center', className)}>
        {showPopover ? (
          <CardPopover>
            <LLink href={`/admin/packages/update/${tier?._id}`}>
              <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} />
            </LLink>
            <CardPopoverContent
              text='Delete'
              icon={<Trash2 className='text-destructive' />}
              onClick={() => setopen(true)}
            />
          </CardPopover>
        ) : null}

        <Typography variant='h4'>{tier?.name || 'Start writing the name'}</Typography>
        <p className='mt-4 text-sm leading-6 text-text-secondary'>
          {tier?.description || 'Start writing the description'}
        </p>
        <div className='flex items-center justify-center'>
          <p className='mt-6 flex items-baseline gap-x-1'>
            <span className='mb-auto text-xl font-bold -translate-y-2 text-text'>$</span>
            <span className='text-5xl font-bold tracking-tight text-text-heading'>
              {tier?.price[frequency.value].price || 0}
            </span>
            <span className='text-sm font-semibold leading-6 text-text-secondary'>{frequency.priceSuffix}</span>
          </p>
        </div>

        {child ? <div className='mt-4'>{child}</div> : null}

        <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-text-secondary'>
          {features.map((feature: string) => (
            <li key={feature} className='flex items-start gap-x-3 text-xs text-left'>
              <div className='bg-primary p-0.5 rounded-full'>
                <CheckIcon className='size-3 flex-none text-white' aria-hidden='true' />
              </div>
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </CardWrapper>
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        title='Are you sure you want to delete this package?'
        cb={() => deletePkg(tier?._id)}
        isLoading={isLoading}
      />
    </>
  )
}
