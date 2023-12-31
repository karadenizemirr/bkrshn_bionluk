import CardComponent from "@/components/card/card.component";
import fetchCategory from "@/pages/api/admin/category";
import React from "react";

const fetchGetPostWithCategory = async (params:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/slugPost',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                slug: params
            }),
            cache: 'no-cache'
        })

        const {ok, data} = await res.json()
        return data

    }catch(err){
        return []
    }
}

export default async function CategoryPost({params}: {params: {category:string}}){
    const posts = await fetchGetPostWithCategory(params.category)
    return (
        <div className="px-5" >
            <CardComponent posts={posts} />
        </div>
    )
}