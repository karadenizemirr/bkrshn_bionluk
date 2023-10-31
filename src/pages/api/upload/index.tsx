import { NextApiRequest, NextApiResponse } from "next";
import {v2 as cloudinary} from 'cloudinary'

const uploadService = (req:NextApiRequest, res:NextApiResponse) => {
    try{
        cloudinary.config({
            api_key: '',
            api_secret:'',
            cloud_name: ''
        })
        cloudinary.uploader.upload(req.body, )
    }catch(err){
        console.log(err)
        return res.status(200).json({ok: false})
    }
}

export default uploadService