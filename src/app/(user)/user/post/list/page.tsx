import PostListContainer from "@/containers/user/postList.container";
import { useAuth } from "@/hooks/useAuth";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const getUserPost = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/post?id='+ id, {
            method:'GET',
            headers: {
                'content-type':'application/json'
            },
            cache: 'no-cache'
        })

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function PostListPageWithUser(){
    const session = await getServerSession(authOption)
    const userPosts = await getUserPost(session?.user?.id)

    const userControl = await useAuth.fromServer('user')
    if (!userControl) return redirect('/')
    return (
        <div>
            <PostListContainer posts={userPosts} />
        </div>
    )
}