import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ui/DarkMode'


export const metadata = {
  title: 'Msg.',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
  <html lang="en" suppressHydrationWarning>
    <head />
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
      >
        {children}

      </ThemeProvider>
    </body>
  </html>
</>
}
