import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetAllCommentsApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(400).send({ok:false})

        const comments = await prisma.commment.findMany({
            include:{
                post: {
                    include:{
                        user:{
                            select: {
                                name: true,
                                surname:true,
                                email: true,
                                phone: true
                            }
                        },
                        image: true
                    }
                }
            }
        })

        return res.status(400).send({ok:true, data:comments})
    }catch(err){
        return res.status(400).send({ok:false})
    }
}