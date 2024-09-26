import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'

function getAbbreviation(name: string): string {
  if (!name) return ''

  // Split the name into words
  const words = name.trim().split(/\s+/)

  // Map each word to its first letter and join them together
  const abbreviation = words
    .splice(0, 2)
    .map(word => word[0])
    .join('')

  return abbreviation.toUpperCase()
}

interface Props {
  imgSrc?: string
  name: string
  className?: string
  nameClassName?: string
  wrapperClassName?: string
}

export default function CardAvatar({ imgSrc, name, className, nameClassName, wrapperClassName }: Props) {
  return (
    <div className={wrapperClassName}>
      <div className={cn('size-20 rounded-full overflow-hidden', className)}>
        {imgSrc ? (
          <Img src={imgSrc} alt={name} className='size-full aspect-square object-cover rounded-full' />
        ) : (
          <div
            className={cn(
              'flex items-center justify-center text-xl font-semibold text-blue-dark bg-blue-light size-full rounded-full',
              nameClassName
            )}
          >
            <p>{getAbbreviation(name)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
