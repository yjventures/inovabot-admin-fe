import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { CheckIcon, PencilLine, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CardWrapper from './commonn/card-wrapper'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import LLink from '@/components/ui/llink'
import { useDeletePackageMutation } from '@/redux/features/packagesApi'
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'

interface Props {
  tier: any
  frequency: any
}

interface Feature {
  name: string
  type: string
  value: string | number
}

function transformFeatures(features: Feature[]) {
  return features.reduce((acc: string[], feature: Feature) => {
    if (feature.type === 'String') {
      acc.push(`${feature.name}: ${feature.value}`)
    } else if (feature.type === 'Boolean' && feature.value) {
      acc.push(feature.name)
    }
    return acc
  }, [])
}

export default function PriceCard({ tier, frequency }: Props) {
  const features = transformFeatures(tier?.features)

  const [open, setopen] = useState<boolean>(false)
  const [deletePkg, { isSuccess, isError, error, isLoading }] = useDeletePackageMutation()

  useEffect(() => {
    if (isSuccess) toast.success('Package deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  return (
    <>
      <CardWrapper key={tier?.id} className='pt-6 pb-8 text-center'>
        <CardPopover>
          <CardPopoverContent
            text='Delete'
            icon={<Trash2 className='text-destructive' />}
            onClick={() => setopen(true)}
          />
          <LLink href={`/admin/packages/update/${tier?._id}`}>
            <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} />
          </LLink>
        </CardPopover>

        <Typography variant='h4'>{tier?.name}</Typography>
        <p className='mt-4 text-sm leading-6 text-text-secondary'>{tier?.description}</p>
        <div className='flex items-center justify-center'>
          <p className='mt-6 flex items-baseline gap-x-1'>
            <span className='mb-auto text-xl font-bold -translate-y-2 text-text'>$</span>
            <span className='text-5xl font-bold tracking-tight text-text-heading'>
              {tier?.price[frequency.value].price}
            </span>
            <span className='text-sm font-semibold leading-6 text-text-secondary'>{frequency.priceSuffix}</span>
          </p>
        </div>

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
      />
    </>
  )
}
