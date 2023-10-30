import NavbarComponent from '@/components/navbar/navbar.components'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-light font-medium container mx-auto' >
        <NavbarComponent />
        {children}
      </body>
    </html>
  )
}
