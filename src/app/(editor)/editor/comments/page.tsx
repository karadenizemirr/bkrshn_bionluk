import EditorsCommentContainer from "@/containers/editor/editors.comments.container";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
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

    const editorControl = await useAuth.fromServer('editor')
    const adminControl = await useAuth.fromServer('admin')

    if (!adminControl || !editorControl) return redirect('/')
    return (
        <div className="mx-auto container p-2 lg:px-20 min-h-[70vh]" >
            <EditorsCommentContainer comments={comments} />
        </div>
    )
}