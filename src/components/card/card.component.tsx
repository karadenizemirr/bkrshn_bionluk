import { parseDate, sliceText } from "@/lib/parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardComponent({ posts }: { posts: any }) {
    return (
        <div className="mt-10 " >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="columns-2 md:columns-3 lg:columns-4">
                {
                    posts.map((item: any, index: number) => (
                        <div className="relative mb-8 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-30 shadow-md rounded-lg hover:-rotate-6 transform transition duration-200" key={index}>
                            <img className="w-full rounded-lg min-h-[32vh] object-cover" src={item.image.slice(-1)[0].url} />
                            <div className="test__body absolute inset-0 p-5 text-white flex flex-col">
                                <div className="relative">
                                    <Link href={`/post/detail/${item?.id}`} className="test__title text-xl lg:text-2xl font-bold mb-3 uppercase hover:text-gray-300 duration-200">
                                        {item?.title}
                                    </Link>
                                    <p className="hover:text-gray-200 duration-200" > 
                                        <Link className="test__author font-sm font-light" href={`/profile/${item?.user?.id}`} >
                                            {item?.user?.name}
                                        </Link>
                                    </p>
                                    <p className="text-sm text-gray-200 italic" >{parseDate(item?.createdAt)}</p>
                                </div>
                                <div className="mt-auto">
                                    <Link href={`/post/${item?.category?.slug}`} className="hover:bg-yellow-300 duration-200" >
                                        <span className="test__tag bg-white bg-opacity-60 py-1 px-3 rounded-md text-black text-sm">{item?.category?.title}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}