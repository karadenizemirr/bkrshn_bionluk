import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LatestPostSliderComponent({ posts }: { posts: any }) {
    const latestPost = posts.slice(0,3)
    return (
        <div className="container mx-auto mt-10 w-full bg-white p-3 rounded-lg grid grid-cols-4 gap-4 overflow-hidden text-sm">
            {
                latestPost.map((item: any,index:number) => (
                    <div className="postCard flex flex-1 justify-center p-2 animate-slide gap-2" key={index}>
                        <div className="img rounded-full">
                            <Image
                                className="rounded-full"
                                src={item?.image[0]?.url}
                                width={55}
                                height={55}
                                alt=""
                                objectFit="center"
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