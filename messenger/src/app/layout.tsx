import './globals.css'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Msg.',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  )
}
