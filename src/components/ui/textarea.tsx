'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { FieldErrors, FieldValues, RegisterOptions, useFormContext, UseFormRegister } from 'react-hook-form'
import { Label } from './label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string
  name?: string
  icon: React.ReactNode
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
  hookFormConfig: RegisterOptions
  label?: string
  showLabel?: boolean
  labelClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { containerClassName, className, icon, name, hookFormConfig, label, labelClassName, showLabel, required, ...props },
    ref
  ) => {
    const {
      register,
      formState: { errors }
    } = useFormContext()

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    React.useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [textareaRef.current?.value])

    const textareaProps = name ? { ...register(name, { required, ...hookFormConfig }), ...props } : { ...props }

    return (
      <div className={cn(containerClassName, { 'flex flex-col gap-y-2': label && showLabel })}>
        {label && showLabel && (
          <Label className={cn('text-text-tartiary', labelClassName)}>
            {label}
            {required ? '*' : null}
          </Label>
        )}
        <div className='relative'>
          <textarea
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              { 'pl-10': icon },
              className
            )}
            ref={el => {
              if (typeof ref === 'function') {
                ref(el)
              } else if (ref) {
                ref.current = el
              }
              textareaRef.current = el
            }}
            {...textareaProps}
          />
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
        {required && name ? (
          <>
            {errors[name] && errors[name]?.type === 'required' ? (
              <span className='text-red-500 text-xs h-5 leading-none'>{label} is required</span>
            ) : (
              <div className='w-full h-5' />
            )}
          </>
        ) : null}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
