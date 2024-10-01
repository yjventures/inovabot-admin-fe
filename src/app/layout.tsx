import ReduxProvider from '@/lib/redux/redux-provider'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import { cn } from '@/lib/utils'
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Public_Sans as FontSans } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Inova'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <ReduxProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
            <Toaster position='top-center' />
            <main>{children}</main>
            <div id='modal-container' />
          </body>
        </ThemeProvider>
      </ReduxProvider>
    </html>
  )
}
