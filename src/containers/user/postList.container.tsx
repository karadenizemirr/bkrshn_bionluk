import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostListContainer({ posts }: { posts?: any }) {
    return (
        <div>
            <div className="title text-center mt-10 mb-10">
                <h1 className="text-2xl" >
                    TÜm Yazılarım
                </h1>
            </div>
            <div className="table w-full">
                <div className="relative overflow-x-auto shadow-md shadow-gray-200 rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                            <th scope="col" className="px-6 py-3">
                                    #
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

                                <th scope="col" className="px-6 py-3">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((item: any, index: number) => (
                                    <tr className="bg-white border-b " key={index}>
                                        <td className="px-6 py-4" key={index}>
                                            <Image src={item?.image[0]?.url} width={50} height={50} alt={item?.image[0]?.alt} className="rounded-full" />
                                        </td>
                                        <td className="px-6 py-4" key={index}>
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4" key={index}>
                                            {item.createdAt}
                                        </td>
                                        <td className="px-6 py-4" key={index}>
                                            {item?.category[0]?.title}
                                        </td>
                                        <td className="px-6 py-4" key={index}>
                                            <Link href={`/post/update/${item.id}`} className="btn-primary shadow-none bg-green-400 mr-3" >
                                                Düzenle
                                            </Link>
                                            <button className="btn-primary shadow-none bg-red-400" >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}