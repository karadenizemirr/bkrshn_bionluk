import PostDetailContainer from "@/containers/home/post.detail.container";
import React from "react";


const fetchGetPost = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/getPost?id=' + id, {cache: 'no-cache'})

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
        <div className="mx-auto container p-2 lg:px-20 mt-10" >
            <PostDetailContainer post={post} />
        </div>
    )
}