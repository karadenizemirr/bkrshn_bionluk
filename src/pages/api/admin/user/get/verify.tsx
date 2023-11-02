import prisma from "@/lib/prisma";
import { verify } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export default async function VerifyUserApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok: false})
        const {id, verify} = req.query

        let _verify;

        if (verify === '0') _verify = false
        else _verify = true


        await prisma.user.update({
            where: {
                id: id as string
            },
            data: {
                isActive: _verify
            }
        })

        return res.status(200).send({ok:true})
    }catch(err){
        return res.status(400).send({ok:false})
    }

}