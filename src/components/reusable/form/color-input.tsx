import { cn } from '@/lib/utils'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import FormFieldError from './form-field-error'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  id?: string
  className?: string
  required?: boolean
  containerClassName?: string
}

export default function ColorInput({ name, label, id, className, required, containerClassName, ...props }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <div className={containerClassName}>
      <label
        className={cn('flex gap-2 items-center rounded-lg py-1.5 px-2 bg-text-heading text-foreground', className)}
        htmlFor={id || name}
      >
        <input type='color' className='colorInput' id={id || name} {...register(name, { required })} {...props} />
        <p className='text-sm font-medium'>{label}</p>
      </label>
      <FormFieldError name={name} required={required} label={label} errors={errors} />
    </div>
  )
}
