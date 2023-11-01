import { getAllCategory } from "@/app/(editor)/editor/category/page";
import PostAddContainer from "@/containers/user/postAdd.container";
import React from "react";

const _getPost = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get/post', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id }),
            cache: 'no-cache'
        })

        const {ok, data} =await res.json()

        if (ok) return data
        else return []
    }catch(err){
        return []
    }
}

export default async function PostUpdate({params}:{params: {id: string}}){
    const {id} = params
    const post = await _getPost(id)
    const categories = await getAllCategory()
    return (
        <div>
            <PostAddContainer categories={categories} data={post} />
        </div>
    )
}