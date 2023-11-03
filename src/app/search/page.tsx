import React from "react";

const fetchSearch = async (keyword:any) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/search', {
            method:'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({keywords: keyword})
        })

        console.log(await res.json())

    }catch(err){
        return []
    }
}

export default async function SearchResultPage({searchParams}:{searchParams:any}) {
    const result = await fetchSearch(searchParams.query)
    return (
        <div>
            Sonuç Bulunamadı
        </div>
    )
}