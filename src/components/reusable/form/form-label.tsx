import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Props {
  label?: string
  labelClassName?: string
  name?: string
  required?: boolean
}

export default function FormLabel({ label, labelClassName, name, required }: Props) {
  return (
    <>
      {label && (
        <Label className={cn('text-text-gray inline-block mb-2', labelClassName)} htmlFor={name}>
          {label}
          {required ? '*' : null}
        </Label>
      )}
    </>
  )
}
