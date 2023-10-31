import PostListContainer from "@/containers/user/postList.container";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

export const getUserPost = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/post?id='+ id, {
            method:'GET',
            headers: {
                'content-type':'application/json'
            },
            cache: 'reload'
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
    return (
        <div>
            <PostListContainer posts={userPosts} />
        </div>
    )
}