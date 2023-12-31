import CategoryContainer from "@/containers/admin/category.container";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React from "react";

export const getAllCategory = async () => {
    try{
        const categories = await fetch(process.env.NEXT_PUBLIC_API_URL + '/admin/category', {
            method:'GET',
            headers:{
                'content-type':'application/json'
            },
            cache: 'no-cache'
        })
        const {ok, data} = await categories.json()
        if (ok) return data

        return []

    }catch(err){
        return []
    }
}

export default async function CategoryPage() {
    const categories = await getAllCategory()
    const editorControl = await useAuth.fromServer('editor')
    const adminControl = await useAuth.fromServer('admin')

    if (!adminControl || !editorControl) return redirect('/')
    return (
        <>
            <CategoryContainer categories={categories} />
        </>
    )
}