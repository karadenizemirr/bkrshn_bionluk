"use client"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function UsersContainer({ users }: { users: any }) {
    const [toggle, setToggle] = useState<boolean>(false)

    const handleOpenToggle = () => {
        setToggle(!toggle);
    }

    return (
        <div>
            <div className="title text-center">
                <h1 className="text-2xl" >
                    Tüm Kullanıcılar
                </h1>
            </div>
            <div className="table w-full mt-5">
                <div className="relative shadow-md shadow-gray-200 rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3" >
                                    Adı Soyadı
                                </th>
                                <th>
                                    Üyelik Tarihi
                                </th>
                                <th>
                                    Telefon
                                </th>
                                <th>
                                    Mail Adresi
                                </th>
                                <th>
                                    Durumu
                                </th>
                                <th>
                                    Rolü
                                </th>
                                <th>
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item: any, index: number) => (
                                    <tr className="bg-white border-b" key={index}>
                                        <td className="px-6 py-3" >
                                            {item.name}{item.surname}
                                        </td>
                                        <td className="px-6 py-3">
                                            {
                                                item?.createdAt
                                            }
                                        </td>
                                        <td className="px-6 py-3">
                                            {item?.phone}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item?.email}
                                        </td>
                                        <td className="px-6 py-3">
                                            {
                                                item?.isActive ? (<span className="text-green-500" >Onaylı</span>) : (<span className="text-red-500" >Onaylanmadı</span>)
                                            }
                                        </td>
                                        <td className="px-6 py-3">
                                            {
                                                item?.role === 'user' ? ('Yazar') : ('Editör')
                                            }
                                        </td>
                                        <td className="px-6 py-3 relative w-32">
                                            <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" onClick={handleOpenToggle} />

                                            {
                                                toggle && (
                                                    <div className="toggle absolute bg-white z-50  p-3 rounded-lg shadow-md left-0">
                                                        <ul className="flex flex-1 flex-col gap-4" >
                                                        <li className="hover:bg-gray-300 duration-200 p-2 rounded-lg text-green-500 cursor-pointer " 
                                                            onClick={async () => {
                                                                const res = await fetch(`
                                                                    ${process.env.NEXT_PUBLIC_API_URL}/admin/user/get/verify?id=${item?.id}&verify=true
                                                                `)

                                                                if (res.status === 200) toast.success('Kullanıcı Engellendi')
                                                                else toast.warning('Bir sorun meydana geldi.')
                                                            }}
                                                        >
                                                                Onayla
                                                            </li>
                                                            <li className="hover:bg-gray-300 duration-200 p-2 rounded-lg text-black cursor-pointer " 
                                                                onClick={async () => {
                                                                    const res = await fetch(`
                                                                        ${process.env.NEXT_PUBLIC_API_URL}/admin/user/get/verify?id=${item?.id}&verify=false
                                                                    `)

                                                                    if (res.status === 200) toast.success('Kullanıcı Engellendi')
                                                                    else toast.warning('Bir sorun meydana geldi.')
                                                                }}
                                                            >
                                                                Engelle
                                                            </li>
                                                            <li className="hover:bg-gray-300 duration-200 p-2 rounded-lg text-yellow-500 cursor-pointer" 
                                                                onClick={async () => {
                                                                    // const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/user/get/role?id=" + item?.id + "&role=" )
                                                                    const res = await fetch(`
                                                                        ${process.env.NEXT_PUBLIC_API_URL}/admin/user/get/role?id=${item?.id}&role=${item?.role === 'user'? ('editor'): ('user')}
                                                                    `)
                                                                    if (res.status === 200) toast.success('Rol başarıyla değiştirildi.')
                                                                    else toast.warning('Rol değiştirilemedi.')
                                                                }}
                                                            >
                                                                Rolü Değiştir
                                                            </li>
                                                            <li className="hover:bg-gray-300 duration-200 p-2 rounded-lg text-red-500 cursor-pointer" >
                                                                Sil
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )
                                            }
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