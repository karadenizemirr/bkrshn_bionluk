import React from "react";

export default function HeaderComponent({ post }: { post: any }) {
    return (
        <div className="mt-10" >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="columns-2 md:columns-3 lg:columns-4">
                {
                    post.map((item: any, index: number) => (
                        <div className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20" key={index}>
                            <img className="w-full rounded-md" src={item.image.slice(-1)[0].url} />
                            <div className="test__body absolute inset-0 p-8 text-white flex flex-col">
                                <div className="relative">
                                    <a className="test__link absolute inset-0" target="_blank" href="/"></a>
                                    <h1 className="test__title text-3xl font-bold mb-3">{item.title}</h1>
                                    <p className="test__author font-sm font-light">
                                        {item.user.name}{item.user.surname}
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <span className="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">{item?.category?.title}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}