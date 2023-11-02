import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteMyPost(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok: false})
        const {id} = req.query

        console.log(id)
        await prisma.post.delete({
            where: {
                id: id as string
            }
        })

        return res.status(200).send({ok:false})
    }catch(err){
        console.log(err)
        return res.status(400).send({ok: false})
    }
}