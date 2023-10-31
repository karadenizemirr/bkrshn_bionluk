import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function EditorGetAllPost(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') return res.status(400).json({ ok: false })

        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true,
                        phone: true,
                        avatar: true,
                    }
                },
                category: true,
                isStatus: true,
                createdAt: true
            }
        })

        return res.status(200).json({ ok: true, data: posts })
    } catch (err) {
        return res.status(400).json({ ok: false })
    }
}