'use client'

import { useTheme } from 'next-themes'

export const useLogo = (lightLogo: string, darkLogo: string): string => {
  const { theme } = useTheme()
  return theme === 'dark' && darkLogo ? darkLogo : lightLogo
}
