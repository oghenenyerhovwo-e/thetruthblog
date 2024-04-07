import { Inter } from 'next/font/google'
import './globals.css'
import "./layout.css"

import { Nav, ReduxProvider, Effects } from '@/components'

export const metadata = {
  title: 'Welcome to the Truth',
  description: "Unveiling the truth behind Nigeria's stories. The Truth Blog delivers in-depth, unbiased reporting on current events, politics, social issues, and more. Get the facts you need to stay informed about Nigeria.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <header>
            <Nav />
          </header>
          <main>
            <Effects />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
