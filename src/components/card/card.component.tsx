import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardComponent({item}: {item:any}) {
    return (
        <div className="mt-10 bg-white col-span-6  p-2 text-sm rounded-lg h-52 flex items-center">
            <div className="card grid grid-cols-12 h-full items-center">
                <div className="image col-span-6 w-full h-full relative rounded-lg">
                    <Image src={item?.image[0]?.url} layout="fill" alt="" objectFit="cover" className="p-3 rounded-lg" />
                </div>
                <div className="content w-full col-span-6 flex flex-1 flex-col gap-3">
                    <div className="category">
                        <span className="text-primary italic" >
                            {item?.category[0]?.title}
                        </span>
                    </div>

                    <div className="title">
                        <Link href={`/post/detail/${item?.id}`} className="font-bold" >
                            {item?.title}
                        </Link>
                    </div>

                    <div className="footer flex flex-1 justify-between text-gray-400 italic">
                        <div className="author">
                            {item?.user?.name} {item?.user?.surname}
                        </div>
                        <div className="date">
                            {item?.createdAt}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}