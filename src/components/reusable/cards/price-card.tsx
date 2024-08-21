import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { CheckIcon } from 'lucide-react'
import React from 'react'

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
  return (
    <div key={tier?.id} className='rounded-lg p-8 text-center bg-foreground'>
      <Typography variant='h4'>{tier?.name}</Typography>
      <p className='mt-4 text-sm leading-6 text-text-tartiary'>{tier?.description}</p>
      <div className='flex items-center justify-center'>
        <p className='mt-6 flex items-baseline gap-x-1'>
          <span className='mb-auto text-xl font-bold -translate-y-2 text-text'>$</span>
          <span className='text-5xl font-bold tracking-tight text-text'>{tier?.price[frequency.value].price}</span>
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
    </div>
  )
}
