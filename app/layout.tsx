import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Городская премия «Вологда для молодежи»',
  description: 'Голосование за лучшего!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}