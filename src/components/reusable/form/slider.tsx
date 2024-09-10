'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import FormFieldError from './form-field-error'
// Start of Selection
import FormLabel from './form-label'

interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'defaultValue'> {
  containerClassName?: string
  name: string
  defaultValue?: number[]
  required?: boolean
  label?: string
  labelClassName?: string
  id?: string
  className?: string
  hint?: string
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    { name, className, defaultValue, required = false, label, labelClassName, containerClassName, id, hint, ...props },
    ref
  ) => {
    const {
      control,
      formState: { errors }
    } = useFormContext()

    // Using `useController` to handle the form state for the slider.
    const {
      field: { value, onChange }
    } = useController({ name, control: control, defaultValue, rules: { required } })

    return (
      <div className={containerClassName}>
        <FormLabel
          label={`${label} ${value !== undefined ? `(${value})` : ''} `}
          labelClassName={labelClassName}
          name={id || name}
          required={required}
          hint={hint}
        />
        <SliderPrimitive.Root
          ref={ref}
          value={[value]} // Ensuring value is passed as an array for the slider
          onValueChange={val => onChange(val[0])} // Destructuring the array to get the single value
          {...props}
          id={id || name}
          className={cn('relative flex w-full touch-none select-none items-center', className)}
        >
          <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-secondary'>
            <SliderPrimitive.Range className='absolute h-full bg-primary' />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
        </SliderPrimitive.Root>
        <FormFieldError label={label} errors={errors} name={name} required={required} />
      </div>
    )
  }
)

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
