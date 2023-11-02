import Image from "next/image";
import React from "react";

export default function FooterComponent() {
    return (
        <div className="mt-10 w-full gap-5 h-64 lg:h-32 ">
            <div className="footer grid grid-cols-12 bg-white h-full items-center">
                <div className="col-span-12 p-3">
                    <div className="content grid grid-cols-12 items-center">
                        <div className="col-span-12 lg:col-span-6 items-center">
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
                        <div className="col-span-12 lg:col-span-6 flex flex-1  gap-2 items-center">
                            <div className="social lg:grid grid-cols-12 gap-5 items-center flex flex-1 flex-wrap justify-center mt-10 lg:mt-0">
                                <Image src="/images/icons/apple.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/facebook.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/google.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/instagram.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/linkedln.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/microsoft.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/snapchat.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/tiktok.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/whatsapp.png" width={30} height={40} alt="apple" />
                                <Image src="/images/icons/x.png" width={30} height={40} alt="apple" />
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