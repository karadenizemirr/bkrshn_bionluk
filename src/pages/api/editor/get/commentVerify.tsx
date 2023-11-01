import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function commentVerifyApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).json({ok:false})
        const {id} = req.query
        
        await prisma.commment.update({
            where: {
                id: id as string
            },
            data: {
                isStatus: true
            }
        })

        return res.status(400).send({ok:true})
    }catch(err){
        return res.status(400).json({ok:false})
    }
}