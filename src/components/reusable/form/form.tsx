'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

interface Props extends HTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<FieldValues, any, undefined>
  children: ReactNode
}

export default function Form({ methods, children, ...rest }: Props) {
  return (
    <FormProvider {...methods}>
      <form {...rest}>{children}</form>
    </FormProvider>
  )
}
