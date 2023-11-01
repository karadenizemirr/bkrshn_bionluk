import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import CommmentComponent from "@/components/comment/comment.component";

export default function PostDetailContainer({post}:{post:any}) {
    return (
        <div>
            <div className="bg-white flex flex-1 justify-center items-center p-3 flex-col">
                <div className="image relative bg-black w-full min-h-[60vh] rounded-lg">
                    <Image src={post?.image[0]?.url} layout="fill" alt="" objectFit="cover" objectPosition="center" className="h-full rounded-lg opacity-80" />
                    <div className="createdAt absolute top-5 left-5 text-white rounded-lg text-sm">
                        {
                            post?.createdAt
                        }
                    </div>
                    <div className="createdAt absolute top-5 right-5 text-white  p-3 rounded-lg text-sm">
                        {
                            post?.category?.title || "Kategori"
                        }
                    </div>
                    <div className="createdAt absolute bottom-5 left-5  p-3 rounded-lg text-sm">
                        <ul className="text-white flex flex-1 gap-5">
                            <li>
                                <FontAwesomeIcon icon={faFacebook} width={20} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faInstagram} width={20} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faWhatsapp} width={20} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTwitter} width={20} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="content mt-5 text-center">
                    <div className="title w-full">
                        <h1 className="text-3xl font-bold" >
                            {post?.title}
                        </h1>
                    </div>
                    <div className="content font-regular mt-5" dangerouslySetInnerHTML={{ __html: post?.content }}></div>
                </div>
            </div>
            <div className="authorCard mt-10 bg-white p-3 rounded-lg flex flex-1 flex-col gap-10">
                <div className="author flex flex-1 gap-4 items-center">
                    <div className="rounded-full" >
                        <Image src={post?.user?.avatar?.url} width={50} height={50} alt="" objectFit="cover" objectPosition="cover" className="rounded-full" />
                    </div>
                    <div className="author">
                        <Link href={`/profile/${post?.user?.id}`} className="text-gray-400 italic" >
                            {post?.user?.name}{post?.user?.surname}
                        </Link>
                    </div>
                    <div className="social">
                        <ul className="flex flex-1 gap-3 text-gray-400" >
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
                <div className="about text-center">
                    {post?.user?.about}
                </div>
                
            </div>
            <div className="comment mt-10">
                <CommmentComponent postId={post?.id} comments = {post?.comment} />
            </div>
        </div>
    )
}