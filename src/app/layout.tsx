import { QueryClient } from '@tanstack/react-query'
import Header from './components/layout/Header'
import './globals.css'
import Providers from './utils/provider'
import Footer from './components/layout/Footer'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'



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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>

  )
}
