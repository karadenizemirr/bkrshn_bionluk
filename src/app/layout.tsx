import NavbarComponent from '@/components/navbar/navbar.components'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/provider/session.provider';
import FooterComponent from '@/components/footer/footer.component';

export const fetchGetAllCategory = async () => {
  try{
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/getAllCategory', {cache:'reload'} )

    const {ok, data} = await res.json()
    if (ok) return data
    else return []
  }catch(err){
    return []
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  const categories = await fetchGetAllCategory()
  return (
    <html lang="en">
      <body className='bg-gray-100 font-medium ' >
        <SessionProvider session={session}>
          <ToastContainer />
          <NavbarComponent categories={categories}  />
            {children}
            <FooterComponent />
        </SessionProvider>
      </body>
    </html>
  )
}
