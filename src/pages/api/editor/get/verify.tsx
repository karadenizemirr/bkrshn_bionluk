import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function postVerify(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') return res.status(400).send({ ok: false })
        const { verify, id } = req.query

        await prisma.post.update({
            where: {
                id: id as string
            },
            data: {
                isStatus: Boolean(verify)
            }
        })

        return res.status(200).send({ ok: true })
    } catch (err) {
        return res.status(400).send({ ok: false })
    }
}