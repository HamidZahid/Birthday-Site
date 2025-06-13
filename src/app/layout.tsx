import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Birthday Celebration',
  description: 'Join us in celebrating this special day!',
  metadataBase: new URL('https://birthday-site.vercel.app'),
  openGraph: {
    title: 'Birthday Celebration',
    description: 'Join us in celebrating this special day!',
    type: 'website',
    images: [
      {
        url: '/images/image-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Birthday Celebration'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Celebration',
    description: 'Join us in celebrating this special day!',
    images: ['/images/image-1.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 