import React from "react";

const fetchGetPostWithCategory = async (slug:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/slugPost', {cache: 'reload'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default function CategoryPost({params}: {params: {category:string}}){
    return (
        <div>
            sad
        </div>
    )
}