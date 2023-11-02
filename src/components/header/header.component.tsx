import { parseDate } from "@/lib/parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderComponent({ post }: { post: any }) {
    const item = post.slice(0, 5)

    return (
        <div className="mt-10" >
            <div className="headerContainer grid grid-cols-12 items-center h-[100vh] lg:h-[60vh]  gap-5">
              
                <div className="left col-span-12 lg:col-span-3 relative h-full flex flex-1 flex-col gap-5">
                    <div className="image1 h-full lg:h-1/2 relative rounded-lg bg-black">
                        <Image src={item[1]?.image[0]?.url} layout="fill" objectFit="cover" alt="asd" className="rounded-lg opacity-70" />
                        <div className="content absolute w-full h-full flex items-center justify-center p-2 flex-col">
                            <h2 className="text-white" >
                                Haftanın Yazısı
                            </h2>
                            <Link href={`/post/detail/${item[1]?.id}`} className="text-white font-bold mt-5 text-xl" >
                                {item[1]?.title}
                            </Link>
                        </div>
                        <div className="footer absolute bottom-2 left-5 flex items-center gap-2 rounded-full">
                            <Image src={item[1]?.user?.avatar?.url} width={30} height={30} alt="" className="rounded-full" />
                            <Link href={`/profile/${item[1]?.user?.id}`} className="text-gray-200 text-sm italic">
                                {item[1]?.user?.name}&nbsp;{item[1]?.user?.surname} - {parseDate(item[1]?.createdAt)}
                            </Link>
                        </div>
                    </div>


                    {/* card2 */}
                    <div className="image1 h-full lg:h-1/2 relative rounded-lg bg-black hidden lg:block">
                        <Image src={item[2]?.image[0]?.url} layout="fill" objectFit="cover" alt="asd" className="rounded-lg opacity-70" />
                        <div className="content absolute w-full h-full flex items-center justify-center">
                            <Link href={`/post/detail/${item[2]?.id}`} className="text-white font-bold text-xl" >
                                {item[2]?.title}
                            </Link>
                        </div>
                        <div className="footer absolute bottom-2 left-5 flex items-center gap-2">
                            <Image src={item[2]?.user?.avatar?.url} width={30} height={30} alt="" className="rounded-full" />
                            <Link href={`/profile/${item[2]?.user?.id}`} className="text-gray-200 text-sm italic">
                                {item[1]?.user?.name}&nbsp;{item[1]?.user?.surname} - {parseDate(item[1]?.createdAt)}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Card3 */}
             
                <div className="center col-span-12 lg:col-span-6 h-full relative bg-black rounded-lg">
                    <Image src={item[0]?.image[0]?.url} layout="fill" objectFit="cover" alt="asd" className="rounded-lg opacity-70" />
                    <div className="content absolute w-full h-full flex items-center justify-center flex-col">
                        <h1 className="text-white" >
                            En Popüler
                        </h1>
                        <Link href={`/post/detail/${item[0]?.id}`} className="text-white font-bold text-xl mt-5" >
                            {item[0]?.title}
                        </Link>
                    </div>
                    <div className="footer absolute bottom-2 left-5 flex items-center gap-2">
                        <Image src={item[0]?.user?.avatar?.url} width={50} height={50} alt="" className="rounded-full" />
                        <Link href={`/profile/${item[1]?.user?.id}`} className="text-gray-200 text-sm italic">
                            {item[0]?.user?.name}&nbsp;{item[1]?.user?.surname} - {parseDate(item[1]?.createdAt)}
                        </Link>
                    </div>
                </div>
                {/* Card4 */}
                <div className="right col-span-12 lg:col-span-3 relative h-full flex flex-1 flex-col gap-5">
                    <div className="image1 h-full lg:h-1/2 relative rounded-lg bg-black">
                        <Image src={item[3]?.image[0]?.url} layout="fill" objectFit="cover" alt="asd" className="rounded-lg opacity-70" />
                        <div className="content absolute w-full h-full flex items-center justify-center">
                            <Link href={`/post/detail/${item[3]?.id}`} className="text-white font-bold text-xl" >
                                {item[3]?.title}
                            </Link>
                        </div>
                        <div className="footer absolute bottom-2 left-5 flex items-center gap-2">
                            <Image src={item[3]?.user?.avatar?.url} width={30} height={30} alt="" className="rounded-full" />
                            <Link href={`/profile/${item[1]?.user?.id}`} className="text-gray-200 text-sm italic">
                                {item[3]?.user?.name}&nbsp;{item[1]?.user?.surname} - {parseDate(item[1]?.createdAt)}
                            </Link>
                        </div>
                    </div>
                    {/* Card5 */}
                    <div className="image1 h-1/2 relative rounded-lg bg-black hidden lg:block">
                        <Image src={item[4]?.image[0]?.url} layout="fill" objectFit="cover" alt="asd" className="rounded-lg opacity-70" />
                        <div className="content absolute w-full h-full flex items-center justify-center">
                            <Link href={`/post/detail/${item[4]?.id}`} className="text-white font-bold text-xl" >
                                {item[4]?.title}
                            </Link>
                        </div>
                        <div className="footer absolute bottom-2 left-5 flex items-center gap-2">
                            <Image src={item[4]?.user?.avatar?.url} width={30} height={30} alt="" className="rounded-full" />
                            <Link href={`/profile/${item[1]?.user?.id}`} className="text-gray-200 text-sm italic">
                                {item[4]?.user?.name}&nbsp;{item[1]?.user?.surname} - {parseDate(item[1]?.createdAt)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}