import { QueryClient } from '@tanstack/react-query'
import Header from './components/layout/Header'
import './globals.css'
import { Poppins } from 'next/font/google'
import Providers from './utils/provider'
import Footer from './components/layout/Footer'

const poppins = Poppins({
  subsets: ["latin"], weight: ["400"]
})

export const metadata = {
  title: 'Sponsor a Dog',
  description: 'Sponsor a Dog',
}

const queryClient = new QueryClient;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
