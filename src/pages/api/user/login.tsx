import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from 'bcrypt'

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') return res.status(405).json({ ok: false })
        const { email, password } = req.body

        // User Control

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user) {
            // Password Control

            const passwordControl = await bcrypt.compare(password, user.password)

            if (passwordControl) return res.status(200).json({ ok: true, user: user})

            return res.status(401).json({ ok: false})
        }

        return res.status(401).json({ ok: false })

    } catch (err) {
        return res.status(500).json({ ok: false })
    }
}