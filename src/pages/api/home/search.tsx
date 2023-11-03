import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function searchApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(400).send({ok:false})

        const {keywords} = req.body

        const result = await prisma.post.findMany({
            where: {
              OR: [
                {
                  title: {
                    mode: 'insensitive',
                    contains: keywords.toLowerCase(),
                  },
                },
                {
                  content: {
                    mode: 'insensitive',
                    contains: keywords.toLowerCase(),
                  },
                },
              ],
            },
          });
        return res.status(200).send({ok: true, data:result})

    }catch(err){
        return res.status(400).send({ok:false})
    }
}