"use client"
import { faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function NavbarComponent({ categories }: { categories?: any }) {
    const { data: session }: { data: any } = useSession();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false)


    const handleToggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleCategoryToggleMenu = () => {
        setCategoryOpen(!categoryOpen)
    }

    return (
        <div className="navbar-container bg-white p-5">
            <nav className="grid grid-cols-12 container mx-auto items-center px-20">
                <div className="logo col-span-2">
                    <h1 className="text-3xl font-bold" >
                        brkshn
                    </h1>
                </div>
                <div className="menu col-span-6">
                    <ul className="flex flex-1 gap-10" >
                        <li>
                            <Link href="/" >
                                Anasayfa
                            </Link>
                        </li>
                        <li className="relative bg-white z-50 cursor-pointer" onMouseEnter={handleCategoryToggleMenu} onMouseLeave={handleCategoryToggleMenu}>
                            <span>
                                Kategoriler <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                            {
                                categoryOpen && (
                                    <div className="dropdown absolute bg-white shadow-md w-auto p-3 rounded-lg">
                                        <ul className="flex flex-1 flex-col gap-4" >
                                            {
                                                categories.map((item: any, index: number) => (
                                                    <li key={index} className="p-2 hover:bg-gray-300 duration-200" >
                                                        <Link href="/" >
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </li>
                        <li>
                            Hakkımızda
                        </li>
                        <li>
                            İletişim
                        </li>
                    </ul>
                </div>
                <div className="buttonGroup col-span-4 flex flex-1 justify-end gap-10 items-center">
                    {
                        session?.user?.role === 'user' ? (
                            <div className="relative" onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu}  >
                                <Link href="/user/post/add" className="btn-primary" >
                                    Yazı Ekle
                                </Link>
                                {
                                    isOpen && (
                                        <div className="toggle absolute bg-white p-5 shadow-md rounded-lg z-50 ">
                                            <ul className="flex flex-1 flex-col gap-4" >
                                                <li className="p-2 hover:bg-gray-300 duration-200">
                                                    <Link href="/user/post/list" >
                                                        Yazılarım
                                                    </Link>
                                                </li>
                                                <li className="p-2 hover:bg-gray-300 duration-200" >
                                                    <Link href={`/user/profile/${session?.user?.id}`} >
                                                        Profilim
                                                    </Link>
                                                </li>
                                                <li className="p-2 hover:bg-gray-300 duration-200" >
                                                    <Link href="#" onClick={() => { signOut() }}>
                                                        Çıkış Yap
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        ) : session?.user?.role === 'editor' ? (
                            <div className="relative" onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu} >
                                <button className="btn-primary" >
                                    Menu
                                </button>
                                {
                                    isOpen && (
                                        <div className="toggle absolute bg-white p-5 shadow-md rounded-lg z-50">
                                            <ul className="flex flex-1 flex-col gap-4" >
                                                <li className="p-2 hover:bg-gray-300 duration-200" >
                                                    <Link href="/editor/posts" >
                                                        Yazılar
                                                    </Link>
                                                </li>
                                                <li className="p-2 hover:bg-gray-300 duration-200" >
                                                    <Link href="/editor/comments" >
                                                        Yorumlar
                                                    </Link>
                                                </li>
                                                <li className="p-2 hover:bg-gray-300 duration-200" >
                                                    <Link href="/editor/category" >
                                                        Kategoriler
                                                    </Link>
                                                </li>
                                                <li className="p-2 hover:bg-gray-300 duration-200" >
                                                    <Link href="#" onClick={() => { signOut() }}>
                                                        Çıkış Yap
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <>
                                <Link href="/register" >
                                    Yazar Ol
                                </Link>
                                <Link href="/login" className="btn-primary" >
                                    Giriş Yap
                                </Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}