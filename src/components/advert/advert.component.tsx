import Link from "next/link";
import React from "react";

export default function AdvertComponent() {
    return (
        <div className="mt-10 w-full text-white h-56 bg-gradient-to-tl from-blue-400 to-blue-600 flex flex-1 items-center justify-center mb-10">
            <div className="content text-center flex flex-col gap-5">
                <h1 className=" text-2xl lg:text-5xl font-bold" >
                    Yaratıcılığınızı <span className="text-yellow-400 font-regular mb-5 italic" >Özgür</span> Bırakın !
                </h1>
            </div>
        </div>
    )
}