import AdvertComponent from '@/components/advert/advert.component'
import CardComponent from '@/components/card/card.component'
import HeaderComponent from '@/components/header/header.component'
import LatestPostSliderComponent from '@/components/latest-post/latestPostSlider.component'


const fetchGetAllPost = async () => {
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
    console.log(err)
    return []
  }
}
export default async function Home() {
  const posts = await fetchGetAllPost()
  const postsFilter = posts.slice(0, 10)

  return (
    <div>
      <div className="mx-auto container px-20">
        <LatestPostSliderComponent posts={posts} />
        <HeaderComponent post={posts} />
      </div>
      <AdvertComponent />
      <div className="title mx-auto container px-20 mb-10">
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
