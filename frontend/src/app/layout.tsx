import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Directorio de Contactos',
  description: 'Aplicación para gestionar contactos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Fondo global */}
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#0f172a', // mismo fondo que te gustó
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
