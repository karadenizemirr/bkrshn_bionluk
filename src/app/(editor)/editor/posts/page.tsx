import EdıtorsPostsContainer from "@/containers/editor/editors.posts.container";
import React from "react";


const fetchGetAllPost = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/editor/get/posts', {cache: 'no-cache'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function EditorPosts(){
    const posts = await fetchGetAllPost()
    return (
        <div className="mx-auto container mt-10 mb-10" >
            <EdıtorsPostsContainer posts={posts} />
        </div>
    )
}