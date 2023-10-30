import Link from "next/link";
import React from "react";

export default function NavbarComponent(){
    return (
        <nav className="container mx-auto py-5" >
            <section className="navbar grid grid-cols-12 items-center">
                <div className="logo col-span-2">
                    <h1 className="text-2xl font-bold" >
                        bkrshn
                    </h1>
                </div>
                <div className="menu col-span-8 flex ">
                    <ul className="flex flex-1 items-center gap-10" >
                        <li>
                            <Link href="/" >
                                Anasayfa
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" >
                                Tüm Yazılar
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" >
                                Hakkımızda
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" >
                                İletişim
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="button col-span-2 flex flex-1 justify-end items-center gap-10">
                    <Link href="/" >
                        Yazar Ol
                    </Link>
                    <button className="btn-primary" >
                        Giriş Yap
                    </button>
                </div>

            </section>
        </nav>
    )
}