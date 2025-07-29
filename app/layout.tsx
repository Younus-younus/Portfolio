import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Younus - Full Stack Developer Portfolio',
  description: 'Full Stack Web Developer specializing in React, Node.js, and modern web technologies. Available for internships and freelance projects.',
  keywords: 'full stack developer, web developer, react, nodejs, portfolio, freelancer',
  authors: [{ name: 'Younus' }],
  creator: 'Younus',
  openGraph: {
    title: 'Younus - Full Stack Developer Portfolio',
    description: 'Full Stack Web Developer specializing in React, Node.js, and modern web technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Younus - Full Stack Developer Portfolio',
    description: 'Full Stack Web Developer specializing in React, Node.js, and modern web technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Logo.jpg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
