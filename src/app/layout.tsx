import NavbarComponent from '@/components/navbar/navbar.components'
import './globals.css'
import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/provider/session.provider';
import FooterComponent from '@/components/footer/footer.component';
import { fetchGetAllPost } from './page';
import Head from 'next/head';

// export const fetchGetAllCategory = async () => {
//   try{
//     const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/getAllCategory', {cache:'default'} )

//     const {ok, data} = await res.json()
//     if (ok) return data
//     else return []
//   }catch(err){
//     return []
//   }
// }


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  // const categories = await fetchGetAllCategory()
  const posts = await fetchGetAllPost()

  return (
    <html lang="en">
      <body className='bg-white font-medium ' >
        <Head>
          <meta name="description" content="Sayfa açıklaması" />
          <meta name="keywords" content="anahtar kelimeler, sayfa" />
          <meta name="author" content="Yazar Adı" />
          <link rel="canonical" href="https://www.example.com" />
          <meta property="og:title" content="Open Graph Başlık" />
          <meta property="og:description" content="Open Graph Açıklaması" />
          <meta property="og:image" content="https://www.example.com/image.jpg" />
          <meta property="og:url" content="https://www.example.com" />
        </Head>
        <SessionProvider session={session}>
          <ToastContainer />
          <NavbarComponent posts={posts} />
          {children}
          <FooterComponent />
        </SessionProvider>
      </body>
    </html>
  )
}
