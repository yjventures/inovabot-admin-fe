import { cn } from '@/lib/utils'
import Image, { StaticImageData } from 'next/image'
import { HTMLAttributes } from 'react'

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: StaticImageData | string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  activePlaceholder?: boolean
}

export function Img({
  src,
  alt,
  width = 500,
  height = 500,
  sizes = '40vw',
  className,
  activePlaceholder = false,
  ...rest
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      className={cn('w-full h-auto block', className)}
      placeholder={activePlaceholder ? 'blur' : 'empty'}
      loading='lazy'
      blurDataURL={rgbDataURL(237, 181, 6)}
      {...rest}
    />
  )
}
