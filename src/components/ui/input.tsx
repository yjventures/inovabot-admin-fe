'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { Label } from './label'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  name: string
  icon: React.ReactNode
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
  hookFormConfig: RegisterOptions
  label?: string
  showLabel?: boolean
  labelClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName,
      className,
      type,
      icon,
      errors,
      register,
      name,
      hookFormConfig,
      label,
      showLabel,
      labelClassName,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setshowPassword] = React.useState(false)
    const inputProps = register ? { ...register(name, { required, ...hookFormConfig }), ...props } : { ...props }

    return (
      <div className={cn(containerClassName, { 'flex flex-col gap-y-2': label && showLabel })}>
        {label && showLabel && (
          <Label className={cn('text-text-tartiary', labelClassName)}>
            {label}
            {required ? '*' : null}
          </Label>
        )}
        <div className='relative'>
          <input
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              { 'pl-10': icon },
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
              className={cn(
                'absolute inset-y-0 left-2.5 top-0 flex items-center [&>svg]:size-6 text-muted-foreground',
                {}
              )}
            >
              {icon}
            </div>
          )}
        </div>
        {required ? (
          <div className='flex justify-start mt-2'>
            {errors[name] && errors[name]?.type === 'required' ? (
              <span className='text-red-500 text-xs h-5 leading-none !text-left'>{label} is required</span>
            ) : (
              <div className='w-full h-5' />
            )}
          </div>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
