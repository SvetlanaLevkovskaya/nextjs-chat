import { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

import './globals.css'

const inter = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
