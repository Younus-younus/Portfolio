import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Younus - Machine Learning Engineer Portfolio',
  description: 'Machine Learning Engineer specializing in Deep Learning, AI Systems, Computer Vision, and NLP. Building production-scale ML solutions.',
  keywords: 'machine learning engineer, AI engineer, deep learning, computer vision, NLP, data science, PyTorch, TensorFlow, MLOps',
  authors: [{ name: 'Younus' }],
  creator: 'Younus',
  openGraph: {
    title: 'Younus - Machine Learning Engineer Portfolio',
    description: 'Machine Learning Engineer specializing in Deep Learning, AI Systems, and production ML deployments.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Younus - Machine Learning Engineer Portfolio',
    description: 'Machine Learning Engineer specializing in Deep Learning, AI Systems, and production ML deployments.',
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
