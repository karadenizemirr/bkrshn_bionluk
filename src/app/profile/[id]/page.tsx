import { getUserPost } from "@/app/(user)/user/post/list/page";
import UserProfileContainer from "@/containers/home/profle.container";
import React from "react";

import { Metadata } from 'next'

export const metadata:Metadata = {
  title:'Profil'
}

const fetchGetUser = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/getUser?id=' + id, {cache:'default'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function ProfilePage({params}: {params: {id:string}}){
    const posts = await getUserPost(params.id)
    const user = await fetchGetUser(params.id)

    return (
        <div>
            <UserProfileContainer posts={posts} user={user} />
        </div>
    )
}