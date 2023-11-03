import { parseDate, sliceText } from "@/lib/parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardComponent({ item }: { item: any }) {
    return (
        <div className="mt-10 bg-white col-span-12 lg:col-span-6  p-2 text-sm rounded-lg h-52 flex items-center w-full">
            <div className="card grid grid-cols-12 h-full items-center gap-5">

                <div className="image col-span-6 w-48 h-full relative rounded-lg">
                    <Image src={item?.image[0]?.url} layout="fill" alt="" objectFit="cover" className="p-3 rounded-lg" />
                </div>

                <div className="content w-full col-span-6 flex flex-1 flex-col gap-3 items-start">
                    <div className="category">
                        <Link href={"/post/" + item?.category?.slug} >
                            <span className="text-primary italic" >
                                {item?.category?.title}
                            </span>
                        </Link>
                    </div>

                    <div className="title">
                        <Link href={`/post/detail/${item?.id}`} className="font-bold hover:text-gray-400 duration-200" >
                            {sliceText(item?.title, 20)}
                        </Link>
                    </div>

                    <div className="footer flex flex-1 flex-col justify-between text-gray-400 italic">
                        <div className="author">
                            <Link href={"/profile/" + item?.user?.id} className="hover:text-black duration-200">
                                {item?.user?.name}&nbsp;{item?.user?.surname}
                            </Link>
                        </div>
                        <div className="date">
                            {parseDate(item?.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}