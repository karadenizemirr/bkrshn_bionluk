import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUser(req:NextApiRequest, res:NextApiResponse) {
    try{
        if (req.method !== 'GET') return res.status(400).send({ok:false})
        const {id} = req.query

        const user = await prisma.user.findUnique(
            {
                where: {
                    id: id as string
                },
                select:{
                    name: true,
                    surname: true,
                    avatar: true,
                    about: true
                }
            }
        )

        return res.status(400).send({ok:true, data:user})
    }catch(err){
        return res.status(400).send({ok:false})
    }
}