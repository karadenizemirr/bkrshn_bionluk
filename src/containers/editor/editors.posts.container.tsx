"use client"
import { faChevronCircleDown, faClose, faToggleOn, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function EdıtorsPostsContainer({ posts }: { posts: any }) {
    const [openMenus, setOpenMenus] = useState<number[]>([]);
    const [detailIndex, setDetailIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="relative" >
            <div className="min-h-[70vh]" >
                <div className="title text-center mt-10 mb-10">
                    <h1 className="text-2xl" >
                        Tüm Yazılar
                    </h1>
                </div>
                <div className="table w-full">
                    <div className="relative  shadow-md shadow-gray-200 rounded-lg">
                        <table className="w-full text-sm text-center text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3" >
                                        Adı Soyadı
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Başlık
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Eklenme Tarihi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Kategorisi
                                    </th>
                                    <th scope="col" className="px-6 py-3" >
                                        Durumu
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        İşlem
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.map((item: any, index: number) => (
                                        <tr className="bg-white border-b" key={index} >
                                            <td className="px-6 py-4" >
                                                {item?.user.name}{item?.user.surname}
                                            </td>
                                            <td className="px-6 py-4" >
                                                {item?.title}
                                            </td>
                                            <td className="px-6 py-4" >
                                                {item?.createdAt}
                                            </td>
                                            <td className="px-6 py-4" >
                                                {item?.category?.title}
                                            </td>
                                            <td className="px-6 py-4" >
                                                {
                                                    item?.isStatus ? (<span className="text-green-500" >Onaylandı</span>) : (<span className="text-red-500" >Onaylanmadı</span>)
                                                }
                                            </td>
                                            <td className="px-6 py-4 text-center flex justify-center relative">
                                                <FontAwesomeIcon icon={faChevronCircleDown} width={15} className="cursor-pointer" onClick={() => { setOpenMenus(openMenus.includes(index) ? [] : [index]) }} />
                                                {openMenus.includes(index) && (
                                                    <div className="toggleMenu absolute bg-white top-10 p-5 z-50">
                                                        <ul className="flex flex-col gap-5">
                                                            <li>
                                                                <button className="text-green-700" onClick={async () => {
                                                                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor/get/verify?id=${item?.id}&verify=true`)
                                                                    const { ok } = await res.json()
                                                                    setOpenMenus(prev => prev.filter(i => i !== index))

                                                                    if (ok) {
                                                                        toast.success('Yazı Onaylandı')
                                                                    } else {
                                                                        toast.error("Yazı Onaylanırken Sorun Oluştu")
                                                                    }
                                                                }}>
                                                                    Onayla
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="text-red-700" onClick={async () => {
                                                                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor/get/verify?id=${item?.id}&verify=false`)
                                                                    const { ok } = await res.json()
                                                                    setOpenMenus(prev => prev.filter(i => i !== index))

                                                                    if (ok) {
                                                                        toast.success('Yazı Reddedildi')
                                                                    } else {
                                                                        toast.error("Bir Sorun Oluştu")
                                                                    }
                                                                }}>
                                                                    Reddet
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button onClick={() => {
                                                                    setOpenMenus(prev => prev.filter(i => i !== index))
                                                                    setOpenModal(true)
                                                                    
                                                                    }} >
                                                                    Detaylar
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                openModal && (
                    <div className="detailModal absolute top-0 bg-white w-full p-4 h-[70vh] overflow-auto">
                        <div className="topbar text-end">
                            <FontAwesomeIcon icon={faClose} className="cursor-pointer" onClick={() => { 
                                setOpenModal(false) 
                                }} />
                        </div>
                        <div className="content text-center">
                            <div className="image flex items-center justify-center mt-5 mb-5">
                                <Image src={posts[detailIndex]?.image[0]?.url} width={400} height={400} alt="" />
                            </div>
                            <div className="title">
                                <h1 className="text-3xl font-bold" >
                                    {posts[detailIndex]?.title}
                                </h1>
                            </div>
                            <div className="content mt-5">
                                <p>{posts[detailIndex]?.content}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}