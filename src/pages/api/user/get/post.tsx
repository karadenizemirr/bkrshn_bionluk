import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetPost(req:NextApiRequest, res:NextApiResponse){
    try{
        
        if (req.method !== 'POST') return res.status(400).send({ok: false})

        const {id} = req.body

        const post = await prisma.post.findMany({
            where: {
                id: id
            },
            include:{
                user: {
                    select: {
                        name: true,
                        avatar: true,
                        surname: true,
                        about: true,
                    },
                },
                category: true,
                image: true
            }
        })

        return res.status(200).json({ok:true, data:post})

    }catch(err){
        console.log(err)
        return res.status(400).json({ok: false})
    }
}