import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetAllCategoryApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok: false})

        const categories = await prisma.category.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })

        return res.status(200).send({ok: true, data:categories})
    }catch(err){
        return res.status(400).send({ok:false})
    }
}