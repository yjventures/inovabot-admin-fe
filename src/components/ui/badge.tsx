import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { HTMLAttributes, ReactNode } from 'react'

const badgeVariants = cva('rounded-sm text-xs font px-2 py-0.5 font-semibold', {
  variants: {
    variant: {
      emerald: 'bg-emerald-light text-emerald-dark',
      cyan: 'bg-cyan-light text-cyan-dark',
      blue: 'bg-blue-light text-blue-dark',
      magenta: 'bg-magenta-light text-magenta-dark',
      orange: 'bg-orange-light text-orange-dark',
      error: 'bg-error-light text-error'
    },
    styleType: {
      solid: '',
      default: ''
    }
  },
  compoundVariants: [
    { variant: 'emerald', styleType: 'solid', class: 'bg-emerald-dark text-white' },
    { variant: 'cyan', styleType: 'solid', class: 'bg-cyan-dark text-white' },
    { variant: 'blue', styleType: 'solid', class: 'bg-blue-dark text-white' },
    { variant: 'magenta', styleType: 'solid', class: 'bg-magenta-dark text-white' },
    { variant: 'orange', styleType: 'solid', class: 'bg-orange-dark text-white' },
    { variant: 'error', styleType: 'solid', class: 'bg-error text-white' }
  ],
  defaultVariants: {
    variant: 'emerald',
    styleType: 'default'
  }
})

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode
  className?: string
  solid?: boolean
}

export default function Badge({ children, className, variant, solid = false }: Props) {
  return <p className={cn(badgeVariants({ variant, styleType: solid ? 'solid' : 'default', className }))}>{children}</p>
}
