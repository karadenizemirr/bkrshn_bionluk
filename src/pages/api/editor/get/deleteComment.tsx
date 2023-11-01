import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteComment(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok:false})

        const {id} = req.query
        //delete comment logic here...

        await prisma.commment.delete({
            where:{
                id: id as string
            }
        })

        return res.status(200).send({ok:true})

    }catch(err){
        return res.status(400).send({ok: false})
    }
}