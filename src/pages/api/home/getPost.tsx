import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getPost(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok:false})

        const {id} = req.query

        const post = await prisma.post.findUnique({
            where:{
                id: id as string,
                isStatus: true
            },
            select: {
                id: true,
                title:true,
                content: true,
                keywords: true,
                createdAt: true,
                category: true,
                user: {
                    select: {
                        name: true,
                        surname: true,
                        id: true,
                        avatar: true,
                        about: true
                    }
                },
                image:true,
                comment: true
            }

        })

        return res.status(200).send({ok:true, data:post})
    }catch(err){
        return res.status(400).send({ok:false})
    }
}