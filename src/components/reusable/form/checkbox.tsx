import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { useFormContext, UseFormReturn } from 'react-hook-form'
import * as React from 'react'

interface Props {
  containerClassName?: string
  label?: string
  labelClassName?: string
  name?: string
  // eslint-disable-next-line no-unused-vars
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  id?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & Props
>(({ className, label, labelClassName, name, containerClassName, onCheckedChange, id, ...props }, ref) => {
  const formContext = useFormContext<UseFormReturn>()

  React.useEffect(() => {
    if (name && formContext) {
      formContext.register(name)
      if (formContext.getValues(name) === undefined) {
        formContext.setValue(name, false)
      }
    }
  }, [name, formContext])

  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    if (onCheckedChange) {
      onCheckedChange(checked)
    }
    if (name && formContext) {
      formContext.setValue(name, checked)
    }
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-x-2 mb-4', containerClassName)}>
      <CheckboxPrimitive.Root
        id={id || name}
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className
        )}
        checked={formContext && formContext.getValues(name)}
        onCheckedChange={handleCheckedChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
          <Check className='h-4 w-4' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label className={cn('text-text-gray inline-block', labelClassName)} htmlFor={id || name}>
          {label}
        </Label>
      )}
    </div>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
