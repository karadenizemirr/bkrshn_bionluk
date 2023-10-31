import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetAllPost(req:NextApiRequest, res:NextApiResponse){
    try{

        if (req.method !== 'GET') return res.status(200).json({ok: false})
    
        const posts = await prisma.post.findMany(
            {
                orderBy:{
                    createdAt: 'desc'
                },
                select: {
                    image: true,
                    user: {
                        select:{
                            name:true,
                            surname:true,
                            id: true,
                            avatar: true
                        }
                    },
                    category: true,
                    title: true,
                    content: true,
                    keywords: true,
                    createdAt: true,
                    id: true
                }
            }
        )

        return res.status(200).json({ok:true, data:posts})

    }catch(err){
        return res.status(200).json({ok: false})
    }
}