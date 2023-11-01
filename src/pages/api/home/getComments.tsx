import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { comment } from "postcss";

export default async function getComments(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') return res.status(400).json({ ok: false })
        const { id } = req.query

        const comments = await prisma.commment.findMany({
            where: {
                post: {
                    id: id as string
                }
            }
        })

        return res.status(200).send({ ok: true, data: comment })

    } catch (err) {
        return res.status(400).send({ ok: false })
    }
}