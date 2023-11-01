import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ChangeRoleApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok:false})
        const {id, role} = req.query

        await prisma.user.update({
            where: {
                id: id as string
            },
            data: {
                role: role as string
            }
        })

        return res.status(200).send({ok:false})
    }catch(err){
        return res.status(400).send({ok: false})
    }
}