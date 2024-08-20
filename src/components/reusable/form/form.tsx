'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<T, any, undefined>
  children: ReactNode
}

export default function Form<T extends FieldValues>({ methods, children, ...rest }: Props<T>) {
  return (
    <FormProvider {...methods}>
      <form {...rest}>{children}</form>
    </FormProvider>
  )
}
