import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Spinner from '../icons/Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-gray-secondary',
        secondary: 'bg-gray-secondary text-secondary-foreground hover:bg-gray-primary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        black: 'bg-text-heading text-foreground hover:bg-text-heading/90',
        gradient:
          'bg-gradient-to-r from-blue-dark to-cyan-dark text-foreground hover:from-cyan-dark hover:to-blue-dark transition-all',
        pink: 'bg-pink-primary text-foreground hover:bg-pink-primary/90',
        cyan: 'bg-cyan-primary text-foreground hover:bg-cyan-primary/90',
        magenta: 'bg-magenta-primary text-foreground hover:bg-magenta-primary/90',
        orange: 'bg-orange-primary text-foreground hover:bg-orange-primary/90',
        unstyled: 'text-text-primary'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-lg px-8',
        icon: 'h-10 w-10',
        iconsm: 'h-8 w-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      type = 'button',
      size,
      children,
      disabled = false,
      isLoading = false,
      asChild = false,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {icon && iconPosition === 'left' ? <span className='mr-2 [&>svg]:size-4'>{icon}</span> : null}
        {children}
        {icon && iconPosition === 'right' ? <span className='ml-2 [&>svg]:size-4'>{icon}</span> : null}
        {isLoading ? <Spinner className='animate-spin ml-2 size-5' /> : null}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
