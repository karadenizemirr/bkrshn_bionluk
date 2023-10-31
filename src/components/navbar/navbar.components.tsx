"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function NavbarComponent() {
    const { data: session }: { data: any } = useSession();


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
                        <li>
                            Kategoriler
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
                            <>
                                <Link href={`/user/profile/${session?.user?.id}`} >
                                    Profilim
                                </Link>
                                <Link href="/user/post/list" >
                                    Yazılarım
                                </Link>
                                <Link href="/user/post/add" className="btn-primary" >
                                    Yazı Ekle
                                </Link>
                            </>
                        ) : session?.user?.role === 'editor' ? (
                            <>
                                <Link href="/user/post/add" className="btn-primary" >
                                    Yazılar
                                </Link>
                            </>
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