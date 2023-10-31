import Image from "next/image";
import React from "react";

export default function FooterComponent() {
    return (
        <div className="mt-10 w-full gap-5 h-32 ">
            <div className="footer grid grid-cols-12 bg-white h-full items-center">
                <div className="col-span-4 bg-gradient-to-tl from-blue-400 to-blue-600 p-3 rounded-e-lg text-white flex flex-1 items-center justify-center">
                    <h1 className="text-3xl font-bold" >
                        Yazar Ol !
                    </h1>
                </div>
                <div className="col-span-8 p-3">
                    <div className="content grid grid-cols-12 items-center">
                        <div className="col-span-6">
                            <ul className="flex flex-1 gap-10 items-center justify-center text-sm" >
                                <li>
                                    Anasayfa
                                </li>
                                <li>
                                    Hakkımızda
                                </li>
                                <li>
                                    Gizililik Politikası
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-6 flex flex-1 gap-2 items-center justify-center">
                            <div className="social grid grid-cols-12 gap-5">
                                <Image src="/images/icons/apple.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/facebook.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/google.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/instagram.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/linkedln.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/microsoft.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/snapchat.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/tiktok.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/whatsapp.png" width={40} height={40} alt="apple" />
                                <Image src="/images/icons/x.png" width={40} height={40} alt="apple" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom bg-gray-300 p-2 text-center">
                <h1 className="text-sm" >
                    Tüm Hakları Saklıdır @2023 <span className="text-blue-500" >yazarol.com</span>
                </h1>
            </div>
        </div>
    )
}