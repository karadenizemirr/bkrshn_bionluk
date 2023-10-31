import PostDetailContainer from "@/containers/home/post.detail.container";
import React from "react";


export const fetchGetPost = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/getPost?id=' + id)

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function PostDetail({params}: {params: {id:string}}){
    const post = await fetchGetPost(params?.id)

    return (
        <div className="mx-auto container px-20 mt-10" >
            <PostDetailContainer post={post} />
        </div>
    )
}