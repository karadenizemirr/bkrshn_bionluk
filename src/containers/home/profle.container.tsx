import CardComponent from "@/components/card/card.component";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function UserProfileContainer({ posts, user }: { posts: any, user:any }) {
    return (
        <div className="mx-auto container px-20 my-10 min-h-[60vh]" >
            <div className="userCard bg-white p-4 grid grid-cols-12">
                <div className="col-span-3 flex items-center gap-5">
                    <Image src={user.avatar.url} width={40} height={40} alt="" className="rounded-full" />
                    <div className="info">
                        <span className="text-sm font-bold italic">
                            {user.name}{user.surname}
                        </span>
                        <ul className="flex flex-1 items-center justify-around mt-2" >
                            <li>
                                <FontAwesomeIcon icon={faFacebook} width={15} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faInstagram} width={15} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTwitter} width={15} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-9 flex items-center">
                    <p>
                        {user.about}
                    </p>
                </div>
            </div>
            {/* User Post */}

            <div className='grid grid-cols-12 gap-5' >
                {
                    posts?.map((post:any, index:number) => (
                        <CardComponent item={post} key={index} />
                    ))
                }
            </div>


        </div>
    )
}