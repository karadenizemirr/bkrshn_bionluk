import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from 'bcrypt'

export default async function Register(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') throw new Error('Invalid method')
        
        const data = req.body
        const password = await bcrypt.hash(data.password, 5)
        const createUser = await prisma.user.create({
            data: {
                name:data.name,
                surname:data.surname,
                phone: data.phone,
                email: data.email,
                password: password,
                gender: data.gender,
                jops: data.jops,
                birthday: new Date(data.born_date),
                country: data.country,
                city: data.city,
            }
        })

        if (createUser){
            return res.status(200).json({ok:true})
        }

        return res.status(500).json({ok:false})

    }catch(err){
        console.log(err)
        res.status(500).json({ok:false})
    }
}