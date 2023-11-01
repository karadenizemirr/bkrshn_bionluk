import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetAllUserApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok: false})

        const users = await prisma.user.findMany({
            select:{
                id: true,
                name: true,
                surname: true,
                email: true,
                phone: true,
                createdAt: true,
                isActive: true,
                role: true
            }
        })

        return res.status(200).send({ok:true, data:users})

    }catch(err){
        return res.status(400).send({ok: false})
    }
}