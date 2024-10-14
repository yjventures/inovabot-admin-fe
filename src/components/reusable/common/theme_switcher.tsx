'use client'

import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
}

export default function ThemeSwitcher({ className }: Props) {
  const { setTheme, theme, systemTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  const currentTheme = theme === 'system' ? systemTheme : theme

  function toggleTheme() {
    return currentTheme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => setHasMounted(true), [])

  if (!hasMounted)
    return (
      <span className='animate-pulse min-w-[28px] min-h-[28px] p-1.5 rounded-full dark:bg-zinc-800 bg-zinc-200 border dark:border-zinc-700 border-zinc-300' />
    )

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className={cn('rounded-full duration-300 transition-transform group rotate-0 border p-2', className, {
        '-rotate-180': currentTheme === 'light'
      })}
      aria-label='Toggle Theme'
    >
      {currentTheme === 'light' ? <SunIcon className='size-5' /> : <MoonIcon className='size-5' />}
    </button>
  )
}
