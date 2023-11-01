"use client"
import React from "react";
import { toast } from "react-toastify";

export default function EditorsCommentContainer({ comments }: { comments: any }) {

    return (
        <div className="mt-10" >
            <div className="title text-center">
                <h1 className="text-2xl" >
                    Tüm Yorumlar
                </h1>
            </div>
            <div className="table w-full mt-5">
                <div className="relative overflow-x-auto  shadow-md shadow-gray-200 rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3" >
                                    Adı Soyadı
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Yazı Başlığı
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Eklenme Tarihi
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
                                comments.map((comment: any, index: number) => (
                                    <tr className="bg-white border-b" key={index}>
                                        <td className="px-6 py-3">
                                            {comment.name}{comment.surname}
                                        </td>
                                        <td className="px-6 py-3">
                                            {comment.post.title}
                                        </td>
                                        <td className="px-6 py-3">
                                            {comment.createdAt}
                                        </td>
                                        <td className="px-6 py-3">
                                            {
                                                comment?.isStatus ? (<span className="text-green-500" >Onaylandı</span>) : (<span className="text-red-500" >Onaylanmadı</span>)
                                            }
                                        </td>
                                        <td className="px-6 py-3">
                                            <button className="bg-green-500 p-2 rounded-lg text-white hover:bg-gray-200 duration-200 mr-2"
                                                onClick={async() => {
                                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/editor/get/commentVerify?id=' + comment?.id)
                                                    const {ok} = await res.json()

                                                    if (ok) toast.success('Yorum onaylandı')
                                                    else toast.warning('Yorum onaylanırken sorun meydana geldi.')
                                                }}
                                            >
                                                Onayla
                                            </button>
                                            <button className="bg-red-500 p-2 px-4 rounded-lg text-white hover:bg-gray-200 duration-200"
                                                onClick={async () => {
                                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/editor/get/deleteComment?id=' + comment?.id)
                                                    if (res.status === 200) toast.success('Yorum silindi')
                                                    else toast.warning('Yorum silinemedi.')
                                                }}
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table></div>
            </div>
        </div>
    )
}