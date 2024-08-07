'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {
  children: React.ReactNode
  attribute: 'class' | 'system'
  defaultTheme: 'light' | 'dark'
  enableSystem: boolean
  disableTransitionOnChange: boolean
}

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
