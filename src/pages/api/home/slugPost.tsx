import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function slugPostApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(400).send({ok: false})

        const posts = await prisma.post.findMany({
            where:{
                category:{
                    slug: req.body.slug
                },
                isStatus: true
            },
            select:{
                user: {
                    select:{
                        id: true,
                        name: true,
                        surname: true,
                        about: true,
                        avatar: true
                    }
                },
                title: true,
                content: true,
                image: true,
                createdAt: true
            }
        })

        return res.status(200).send({ok:true, data:posts})


    }catch(err){
        return res.status(400).send({ok: true})
    }
}