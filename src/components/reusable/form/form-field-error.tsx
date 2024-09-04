import { cn } from '@/lib/utils'
import { formatFieldName } from '@/utils/form/formatFieldName'
import { FieldErrors, FieldValues } from 'react-hook-form'

interface Props {
  required?: boolean
  name?: string
  errors: FieldErrors<FieldValues>
  label?: string
  errorClassName?: string
}

export default function FormFieldError({ required, name, errors, label, errorClassName }: Props) {
  return (
    <>
      {required && name ? (
        <div className={cn('flex justify-start my-1', errorClassName)}>
          {errors[name] && errors[name]?.type === 'required' ? (
            <span className='text-red-500 text-xs h-3 leading-none !text-left font-medium'>
              {label || formatFieldName(name)} is required
            </span>
          ) : (
            <div className='w-full h-3' />
          )}
        </div>
      ) : (
        <div className='w-full h-4' />
      )}
    </>
  )
}
