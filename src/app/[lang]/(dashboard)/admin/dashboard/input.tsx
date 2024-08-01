'use client'

import { InputHTMLAttributes } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  hookFormConfig?: RegisterOptions
}

export default function Input({ name, required, hookFormConfig, ...rest }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <div>
      <input {...register(name, { required, ...hookFormConfig })} {...rest} />
      {required ? (
        <div className='flex justify-start mt-2'>
          {errors[name] && errors[name]?.type === 'required' ? (
            <span className='text-red-500 text-xs h-5 leading-none !text-left'>{name} is required</span>
          ) : (
            <div className='w-full h-5' />
          )}
        </div>
      ) : null}
    </div>
  )
}
