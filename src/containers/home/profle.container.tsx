import CardComponent from "@/components/card/card.component";
import { sliceText } from "@/lib/parser";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserProfileContainer({ posts, user }: { posts: any, user: any }) {
    return (
        <div className="mx-auto container p-2 lg:px-20 my-10 min-h-[60vh]" >

            <div className="userCard bg-white p-4 grid grid-cols-12 items-center gap-y-10">
            
                <div className="col-span-12 lg:col-span-1 flex flex-1 items-center gap-5 w-24 h-24 relative mx-auto ">
                    <Image src={user?.avatar?.url} layout="fill" alt="" className="rounded-full" />
                </div>
            
                <div className="col-span-12 lg:col-span-2 ">
                    <div className="info flex flex-1 flex-col items-center ">
                        <span className="text-sm font-bold italic">
                            {sliceText(user?.name+ ' ' +user?.surname, 20)}
                        </span>
                        <ul className="flex flex-1 items-center justify-around mt-2 gap-3" >
                            <li>
                                <Link href={user?.social?.facebook || ""} >
                                    <FontAwesomeIcon icon={faFacebook} width={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={user?.social?.instagram ||""}>
                                    <FontAwesomeIcon icon={faInstagram} width={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={user?.social?.instagram ||""}>
                                    <FontAwesomeIcon icon={faTwitter} width={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={user?.social?.instagram||""}>
                                    <FontAwesomeIcon icon={faGlobe} width={15} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 flex items-center">
                    <p>
                        {user.about}
                    </p>
                </div>
            </div>
            {/* User Post */}

            <div className='grid grid-cols-12 gap-5' >
                {
                    posts?.map((post: any, index: number) => (
                        post.isStatus ? (
                            <CardComponent item={post} key={index} />
                        ) : ""
                    ))
                }
            </div>


        </div>
    )
}