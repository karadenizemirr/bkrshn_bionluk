import EditorsCommentContainer from "@/containers/editor/editors.comments.container";
import React from "react";

const fetchGetAllComments = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/editor/get/comments', {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function CommentPage(){
    const comments = await fetchGetAllComments()
    return (
        <div className="mx-auto container px-20 min-h-[70vh]" >
            <EditorsCommentContainer comments={comments} />
        </div>
    )
}