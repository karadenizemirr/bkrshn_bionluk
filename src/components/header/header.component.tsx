import Link from "next/link";
import React from "react";

export default function HeaderComponent() {
    return (
        <div className="mt-10" >
            <div className="content-row grid grid-cols-12">
                <div className="col-span-7">
                    <h1 className="text-5xl font-extrabold" >
                        Yazmak Özgürlüktür, <span className="italic font-medium text-primary" >Paylaşmak Tutkudur</span>
                    </h1>
                    <p className="mt-10" >
                        Yazmak, ruhunuzu serbest bırakmanın bir yoludur, her kelimeyle özgürlük bulursunuz.
                    </p>
                </div>
                <div className="col-span-5">
                    Img
                </div>
            </div>
            <div className="category-row mt-10 w-full bg-white rounded-full py-5 px-3 shadow-xl flex flex-1 justify-between items-center">
                <ul>
                    <li>
                        <Link href="/" className="bg-primary rounded-full text-white p-2 px-5 hover:bg-gray-300 duration-200" >
                            Tüm Kategoriler
                        </Link>
                    </li>
                </ul>
                <div className="search border-l">
                    <input type="text" placeholder="Aranacak Kelime" className="p-2 rounded-full px-10" />
                </div>
            </div>
        </div>
    )
}