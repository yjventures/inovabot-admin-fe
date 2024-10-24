'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import FormFieldError from './form-field-error'
import FormLabel from './form-label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string
  name?: string
  icon?: React.ReactNode
  hookFormConfig?: RegisterOptions
  label?: string
  labelClassName?: string
  id?: string
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { containerClassName, className, icon, name, hookFormConfig, label, labelClassName, required, id, hint, ...props },
    ref
  ) => {
    const formContext = useFormContext()
    const { register, formState } = formContext || {}
    const { errors } = formState || {}

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
      <div className={cn(containerClassName)}>
        <FormLabel label={label} labelClassName={labelClassName} name={id || name} required={required} hint={hint} />
        <div className='relative'>
          <textarea
            className={cn(
              'flex min-h-[80px] w-full rounded-lg border border-foreground-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-text-gray-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              { 'pl-10': icon },
              className
            )}
            id={id || name}
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
        <FormFieldError name={name} required={required} label={label} errors={errors} />
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
