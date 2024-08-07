import type { Metadata } from 'next'
import { Public_Sans as FontSans } from 'next/font/google'
import '@/styles/globals.scss'
import { cn } from '@/lib/utils'
import { Toaster } from 'react-hot-toast'
import ReduxProvider from '@/lib/redux/redux-provider'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'

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
  children: React.ReactNode
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
