'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface Props {
  containerClassName?: string
  label?: string
  labelClassName?: string
  name?: string
  hookFormConfig?: RegisterOptions
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & Props
>(({ className, label, labelClassName, name, containerClassName, onCheckedChange, hookFormConfig, ...props }, ref) => {
  const { watch, setValue } = useFormContext()

  const value = name ? watch(name) : undefined

  return (
    <div className={cn('flex flex-wrap items-center gap-x-2', containerClassName)}>
      <CheckboxPrimitive.Root
        id={name}
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className
        )}
        onCheckedChange={checked => {
          if (onCheckedChange) onCheckedChange(checked)
          if (name) setValue(name, checked)
        }}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
          <Check className='h-4 w-4' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label className={cn('text-text-gray inline-block', labelClassName)} htmlFor={name}>
          {label}
        </Label>
      )}
    </div>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
