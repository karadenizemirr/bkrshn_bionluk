import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from 'slugify'
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            // Get User Data
            const { id } = req.query

            const user = await prisma.user.findUnique({
                where: {
                    id: id as string
                },
                include: {
                    avatar: true,
                    social: true
                }
            })

            return res.status(200).send({ ok: true, user })

        } else if (req.method === 'PUT') {

            const {userId} = req.body
            const data = req.body
            // TODO: password update

            const updateUser = await prisma.user.update({
                where:{
                    id:userId as string
                },
                data: {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    phone: data.phone,
                    gender: data.gender,
                    jops: data.jops,
                    country: data.country,
                    city: data.city,
                    about: data.about,
                    username: data.username,
                    avatar: {
                        create: {
                            url: data.avatar,
                            alt: slugify(data.name + data.surname, {replacement: '-', lower: true}),
                            slug: slugify(data.name + data.surname, {replacement: '-', lower: true})
                        }
                    },
                    social:{
                        create:{
                            instagram: data.instagram,
                            twitter: data.twitter,
                            facebook: data.facebook,
                            website: data.web
                        }
                    }
                }
            })

            return res.status(200).send({ok: true})

        } else {
            return res.status(400).send({ ok: false })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ ok: false })
    }
}