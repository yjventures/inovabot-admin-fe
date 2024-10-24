'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import FormFieldError from './form-field-error'
import FormLabel from './form-label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  name?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  hookFormConfig?: RegisterOptions
  label?: string
  labelClassName?: string
  id?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName,
      className,
      type,
      icon,
      iconPosition = 'left',
      name,
      hookFormConfig,
      label,
      labelClassName,
      required,
      id,
      hint,
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext()
    const { register, formState } = formContext || {}
    const { errors } = formState || {}
    const inputProps = name
      ? {
          ...register(name, {
            required,
            ...hookFormConfig,
            onChange: e => {
              const { value } = e.target
              if (type === 'email') {
                e.target.value = value.trim().toLowerCase()
              }
            }
          }),
          ...props
        }
      : { ...props }

    const [showPassword, setshowPassword] = React.useState(false)

    return (
      <div className={cn(containerClassName)}>
        <FormLabel label={label} labelClassName={labelClassName} name={id || name} required={required} hint={hint} />
        <div className='relative'>
          <input
            id={id || name}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-foreground-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-text-gray-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              { 'pl-10': icon && iconPosition === 'left' },
              { 'pr-10': icon && iconPosition === 'right' },
              className
            )}
            ref={ref}
            {...inputProps}
          />
          {type === 'password' ? (
            <>
              {showPassword ? (
                <Eye
                  className='absolute right-3 top-1/2 -translate-y-1/2 size-5 cursor-pointer text-text'
                  onClick={() => setshowPassword(false)}
                />
              ) : (
                <EyeOff
                  className='absolute right-3 top-1/2 -translate-y-1/2 size-5 cursor-pointer text-text'
                  onClick={() => setshowPassword(true)}
                />
              )}
            </>
          ) : null}
          {icon && (
            <div
              className={cn('absolute inset-y-0 top-0 flex items-center [&>svg]:size-5 text-muted-foreground', {
                'left-2.5': iconPosition === 'left',
                'right-2.5': iconPosition === 'right'
              })}
            >
              {icon}
            </div>
          )}
        </div>
        <FormFieldError name={name} required={required} label={label} errors={errors} />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
