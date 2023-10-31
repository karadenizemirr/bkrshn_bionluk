import NavbarComponent from '@/components/navbar/navbar.components'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getServerSession } from 'next-auth';
import Sessionprovider from '@/components/provider/session.provider'
import SessionProvider from '@/components/provider/session.provider';
import FooterComponent from '@/components/footer/footer.component';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className='bg-gray-100 font-medium ' >
        <SessionProvider session={session}>
          <ToastContainer />
          <NavbarComponent />
            {children}
            <FooterComponent />
        </SessionProvider>
      </body>
    </html>
  )
}
