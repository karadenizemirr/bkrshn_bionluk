import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"
import slugify from "slugify"

const UserPost = async (req:NextApiRequest, res:NextApiResponse) => {
    try{
        if (req.method === 'POST'){
            // Add Post
            const {title, keywords,category,content, userId, image} = req.body
            
            const post = await prisma.post.create({
                data: {
                    title:title,
                    keywords: keywords,
                    content: content,
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    image:{
                        create:{
                            url: image,
                            alt: slugify(title, {replacement:'-', lower: true})
                        }
                    },
                    category:{
                        connect: {
                            id: category
                        }
                    }
                }
            })
            
            return res.status(200).send({ok:true})
        }else if (req.method === 'GET'){
            const {id} = req.query

            if (id){
                const posts = await prisma.post.findMany({
                    where: {
                        user:{
                            id: id as string
                        }
                    },
                    include: {
                        category: true,
                        image:true
                    },
                    orderBy: [{createdAt:"desc"}]
                })

                return res.status(200).json({ok: true, data:posts})
            }else{
                // Get All Post

                const posts = await prisma.post.findMany({
                    include:{
                        user: true,
                        image: true
                    }
                })

                return res.status(200).json({ok:true, data:posts})
            }
        }else if (req.method === 'PUT'){
            const data = req.body

            const update_post = await prisma.post.update({
                where: {
                    id: data.postId
                },
                include:{
                    image: true
                },
                data: {
                    title: data.title,
                    keywords: data.keywords,
                    category: {
                        connect:{
                            id: data.category as string
                        }
                    },
                    image: {
                        create: {
                            url: data.image
                        }
                    }
                },
            })

            return res.status(200).json({ok: true})
        }


    }catch(err){
        console.log(err)
        return res.status(400).send({ok: false})
    }
}

export default UserPost