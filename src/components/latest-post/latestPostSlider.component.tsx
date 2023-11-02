import Image from "next/image";
import Link from "next/link";
import './latestPostSlider.css'

export default function LatestPostSliderComponent({ posts }: { posts: any }) {
    const latestPost = posts.slice(0,20)
    return (
        <div className="container mx-auto mt-10 w-full bg-white p-3 rounded-lg grid grid-cols-4 gap-4 overflow-hidden text-sm postCardContainer">
            {
                latestPost.map((item: any,index:number) => (
                    <div className="postCard flex flex-1 justify-center p-2 animate-slide gap-2 items-center" key={index}>
                        <div className="img rounded-full relative w-[50px] h-[50px]">
                            <Image
                                className="rounded-full "
                                src={item?.image[0]?.url}
                                alt=""
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="title mt-auto mb-auto">
                            <Link href={`/post/detail/${item?.id}`} className="font-bold">{item?.title}</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}