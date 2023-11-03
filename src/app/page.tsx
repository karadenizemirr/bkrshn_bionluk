import AdvertComponent from '@/components/advert/advert.component'
import CardComponent from '@/components/card/card.component'
import CategoryComponent from '@/components/category/category'
import HeaderComponent from '@/components/header/header.component'
import { Metadata } from 'next'
import { getAllCategory } from './(editor)/editor/category/page'

export const metadata:Metadata = {
  title:'Anasayfa'
}


export const fetchGetAllPost = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/allPost', {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      },
      cache: 'no-cache'
    })

    const { ok, data } = await res.json()

    if (ok) return data
    else return []

  } catch (err) {
    return []
  }
}
export default async function Home() {
  const posts = await fetchGetAllPost()
  const postsFilter = posts.slice(0, 10)
  const categories = await getAllCategory()
  return (
    <div>
      <div className="mx-auto container lg:px-20">
        {/* <LatestPostSliderComponent posts={posts} /> */}
        <HeaderComponent post={posts} />
        <CategoryComponent categories={categories} />
      </div>
      <AdvertComponent />
      <div className="title mx-auto container lg:px-20 mb-10">
        <h1 className='text-4xl text-center' >
          Son Eklenen Yazılar
        </h1>
        <div className='grid grid-cols-12 gap-5' >
          {
            postsFilter.map((item: any, index: number) => (
              <CardComponent item={item} key={index} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
