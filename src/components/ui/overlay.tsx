import { lottieDefaultOptions } from '@/configs/lottie'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Lottie from 'react-lottie'

interface Props {
  isOpen: boolean
  animationData: JSON
  text?: string
}

export default function Overlay({ isOpen, animationData, text }: Props) {
  const overlayRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    overlayRef.current = document.getElementById('modal-container')

    if (isOpen) {
      document.documentElement.classList.add('overflow-y-hidden')
    } else {
      document.documentElement.classList.remove('overflow-y-hidden')
    }

    return () => {
      document.documentElement.classList.remove('overflow-y-hidden')
      overlayRef.current = null
    }
  }, [isOpen])

  return isOpen
    ? createPortal(
        <div
          className={cn(
            'w-full min-h-screen flex items-center justify-center fixed left-0 top-0 backdrop-blur-md z-[100] bg-foreground/5'
          )}
        >
          <div className='max-w-md'>
            <Lottie options={lottieDefaultOptions(animationData)} />
            {text ? (
              <p className='text-sky-700 text-center px-5 text-balance text-lg font-medium'>{text}</p>
            ) : (
              <div className='w-full h-7' />
            )}
          </div>
        </div>,
        overlayRef.current as HTMLElement | DocumentFragment
      )
    : null
}
