import { getAllCategory } from "@/app/(editor)/editor/category/page";
import PostAddContainer from "@/containers/user/postAdd.container";
import React from "react";

export default async function AddPostPage(){
    const categories = await getAllCategory()
    
    return (
        <div className="mx-auto container bg-white p-5 mt-10 rounded-lg min-h-[70vh]" >
            <PostAddContainer categories={categories} />
        </div>
    )
}