"use client"
import { toDate } from "@/lib/parser";
import { faBars, faCaretDown, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NavbarComponent({ categories, posts }: { categories?: any, posts?: any }) {
    const { data: session }: { data: any } = useSession();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false)
    const [postIndex, setPostIndex] = useState(0)
    const [mobileToggle, setMobileToggle] = useState(false)

    useEffect(() => {
        let duration = posts.length
        setTimeout(() => {
            setPostIndex(postIndex + 1)

            if (postIndex === duration) {
                setPostIndex(0)
            }
        }, 3000)
    }, [postIndex])


    const handleToggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleCategoryToggleMenu = () => {
        setCategoryOpen(!categoryOpen)
    }

    const handleMobileToggle = () => {
        setMobileToggle(!mobileToggle)
    }

    return (
        <>
            <div className="mobileMneuToggler flex flex-1 items-center justify-between p-3 lg:hidden">
                <div className="logo">
                    <h1 className="text-2xl font-bold" >
                        bkrshn
                    </h1>
                </div>
                <div className="menu">
                    <FontAwesomeIcon icon={faBars} className="text-xl cursor-pointer" onClick={handleMobileToggle} />
                </div>
            </div>

            {
                mobileToggle && (
                    <div className="mobileMenu absolute top-0 w-full h-[100vh] bg-primary z-50 text-white p-5">
                        <div className="topbar flex flex-1 justify-between items-center">
                            <Link href="/login" className="btn-secondary text-black py-2 text-sm">
                                Giriş Yap
                            </Link>
                            <FontAwesomeIcon icon={faClose} onClick={handleMobileToggle} />
                        </div>
                        <div className="menu flex flex-1 items-center justify-center mt-10 m-10">
                            <ul className="flex flex-col gap-4 items-center" >
                                <li className="p-2" >
                                    Anasayfa
                                </li>
                                <li className="p-2" >
                                    Hakkımızda
                                </li>
                                <li className="p-2" >
                                    İletişim
                                </li>
                            </ul>
                        </div>
                        <div className="authMnu border-t">
                            {
                                session?.user?.role === 'user' ? (
                                    <>
                                        <ul className="flex flex-1 flex-col gap-4 items-center mt-10" >
                                        <li className="p-2 hover:bg-gray-300 duration-200">
                                                <Link href="/user/post/add" >
                                                    Yazı Ekle
                                                </Link>
                                            </li>
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
                                    </>
                                ) : session?.user?.role === 'editor' ? (
                                    <>
                                        <ul className="flex flex-1 flex-col gap-4 items-center mt-10" >
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
                                    </>
                                ) : session?.user?.role === 'admin' ? (
                                    <>
                                        <ul className="flex flex-1 flex-col gap-4 items-center mt-10" >
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/admin/user" >
                                                    Kullanıcılar
                                                </Link>
                                            </li>
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
                                    </>
                                ) : ""
                            }
                        </div>
                    </div>
                )
            }
            <div className="w-full" >
                <div className="navbar-container bg-white p-5 hidden lg:block">
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
                                {/* <li className="relative bg-white z-50 cursor-pointer" onMouseEnter={handleCategoryToggleMenu} onMouseLeave={handleCategoryToggleMenu}>
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
                                </li> */}
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
                                ) : session?.user?.role === 'admin' ? (
                                    <div className="relative" onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu} >
                                        <button className="btn-primary" >
                                            Dashboard
                                        </button>
                                        {
                                            isOpen && (
                                                <div className="toggle absolute bg-white p-5 shadow-md rounded-lg z-50">
                                                    <ul className="flex flex-1 flex-col gap-4" >
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/admin/user" >
                                                                Kullanıcılar
                                                            </Link>
                                                        </li>
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
                                    (
                                        <>
                                            <Link href="/register" >
                                                Yazar Ol
                                            </Link>
                                            <Link href="/login" className="btn-primary" >
                                                Giriş Yap
                                            </Link>
                                        </>
                                    )
                                )
                            }
                        </div>
                    </nav>
                </div>
                <div className="endPost container mx-auto lg:px-20 mt-5">
                    <div className="endPost bg-yellow-300 px-5 rounded-lg w-full h-[14vh] lg:h-auto">
                        <div className="latest flex flex-col lg:flex-row items-center gap-2 justify-between md:flex-1">
                            <div className="post">
                               <span className="hidden lg:visible " ><FontAwesomeIcon icon={faPlus} /> En Son:</span>
                                <Link href={'/profile/' + posts[postIndex]?.user?.id} >
                                    <span className=" text-sm italic ml2" >
                                        {posts[postIndex]?.user?.name}&nbsp;{posts[postIndex]?.user?.surname}
                                    </span>

                                </Link>
                            </div>
                            <span className="postname ml-2">
                                <Link href={'/post/detail/' + posts[postIndex]?.id}>
                                    {posts[postIndex]?.title}
                                </Link>
                            </span>
                            <span className="text-sm italic">
                                {toDate(posts[postIndex]?.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}