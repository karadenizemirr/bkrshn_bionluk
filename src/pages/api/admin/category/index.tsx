import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export const fetchCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            // Get All Cateogry
            const categories = await prisma.category.findMany()
            return res.status(200).json({ ok: true, data: categories })
            
        } else if (req.method === 'POST') {
            // Add Category
            const { title } = req.body

            const category = await prisma.category.create({
                data: {
                    title: title as string
                }
            })
            return res.status(200).send({ ok: true })

        } else if (req.method === 'PUT') {
            // Update category
        } else if (req.method === 'DELETE') {
            // Delete Category
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ ok: false })
    }
}
export default fetchCategory