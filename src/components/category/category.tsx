"use client"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import React from "react";

export default function CategoryComponent({ categories }: { categories: any }) {
    const router = useRouter()
    return (
        <div className="mt-20 mb-20" >
            <div className="grid grid-cols-12 lg:gap-10 gap-2">
                {
                    categories.map((item: any, index: number) => (
                        <div className="
                            col-span-6 lg:col-span-3 border p-3 lg:p-4  rounded-lg bg-gradient-to-r from-gray-200 to-gray-100 cursor-pointer flex flex-1 items-center hover:translate-x-6 duration-200" 
                            key={index}
                            onClick={() => {
                                router.push('/post/' + item?.slug)
                            }}
                            >
                            <div className="content">
                                <h1 className="text-lg" >
                                    {item?.title}
                                </h1>
                            </div>
                            <div className="icon flex flex-1 justify-end">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}