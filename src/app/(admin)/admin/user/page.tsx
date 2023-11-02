import UsersContainer from "@/containers/admin/users.container";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React from "react";


const fetchGetAllUser = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/admin/user/get/all', {cache: 'no-cache'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function UserPage(){
    const users = await fetchGetAllUser()

    const adminControl = await useAuth.fromServer('admin')

    if (!adminControl) redirect('/')
    return (
        <div className="mx-auto container px-20 min-h-[70vh] mt-10" >
            <UsersContainer users={users} />
        </div>
    )
}