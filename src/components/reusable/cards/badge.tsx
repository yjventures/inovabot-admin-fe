import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { HTMLAttributes, ReactNode } from 'react'

const badgeVariants = cva('rounded-sm text-xs font px-2 py-0.5 font-semibold inline-block', {
  variants: {
    variant: {
      emerald: 'bg-emerald-light text-emerald-dark',
      cyan: 'bg-cyan-light text-cyan-dark',
      blue: 'bg-blue-light text-blue-dark',
      magenta: 'bg-magenta-light text-magenta-dark',
      orange: 'bg-orange-light text-orange-dark',
      error: 'bg-error-light text-error'
    },
    round: {
      default: 'rounded-sm',
      full: 'rounded-full'
    },
    styleType: {
      solid: '',
      default: ''
    }
  },
  compoundVariants: [
    { variant: 'emerald', styleType: 'solid', class: 'bg-emerald-dark text-foreground' },
    { variant: 'cyan', styleType: 'solid', class: 'bg-cyan-dark text-foreground' },
    { variant: 'blue', styleType: 'solid', class: 'bg-blue-dark text-foreground' },
    { variant: 'magenta', styleType: 'solid', class: 'bg-magenta-dark text-foreground' },
    { variant: 'orange', styleType: 'solid', class: 'bg-orange-dark text-foreground' },
    { variant: 'error', styleType: 'solid', class: 'bg-error text-foreground' }
  ],
  defaultVariants: {
    variant: 'emerald',
    styleType: 'default',
    round: 'default'
  }
})

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode
  className?: string
  solid?: boolean
  rounded?: boolean
  light?: boolean
}

export default function Badge({ children, className, variant, solid = false, rounded = false, light = false }: Props) {
  const getVariantClass = () => {
    if (solid) {
      if (light) {
        switch (variant) {
          case 'emerald':
            return 'bg-emerald-primary text-foreground'
          case 'cyan':
            return 'bg-cyan-primary text-foreground'
          case 'blue':
            return 'bg-blue-primary text-foreground'
          case 'magenta':
            return 'bg-magenta-primary text-foreground'
          case 'orange':
            return 'bg-orange-primary text-foreground'
          case 'error':
            return 'bg-error text-foreground'
          default:
            return ''
        }
      } else {
        switch (variant) {
          case 'emerald':
            return 'bg-emerald-dark text-foreground'
          case 'cyan':
            return 'bg-cyan-dark text-foreground'
          case 'blue':
            return 'bg-blue-dark text-foreground'
          case 'magenta':
            return 'bg-magenta-dark text-foreground'
          case 'orange':
            return 'bg-orange-dark text-foreground'
          case 'error':
            return 'bg-error text-foreground'
          default:
            return ''
        }
      }
    }
    return ''
  }

  return (
    <p
      className={cn(
        badgeVariants({
          variant,
          styleType: solid ? 'solid' : 'default',
          round: rounded ? 'full' : 'default'
        }),
        getVariantClass(),
        className
      )}
    >
      {children}
    </p>
  )
}
