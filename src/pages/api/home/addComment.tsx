import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function AddComment(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(400).send({ok:false})

        const {name,surname,postId, comment} = req.body

        const addComment = await prisma.commment.create({
            data: {
                comment: comment,
                name: name,
                surname: surname,
                rate: 5,
                post: {
                    connect: {
                        id: postId as string
                    }
                }
            },
        })

        return res.status(200).json({ok:true})

    }catch(err){
        return res.status(400).json({ok:false})
    }
}