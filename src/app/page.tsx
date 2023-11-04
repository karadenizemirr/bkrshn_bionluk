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
  const categories = await getAllCategory()
  return (
    <div>
      <div className="px-5">
        {/* <LatestPostSliderComponent posts={posts} /> */}
        <CardComponent posts={posts} />
        <CategoryComponent categories={categories} />
      </div>
      <AdvertComponent />
    </div>
  )
}
