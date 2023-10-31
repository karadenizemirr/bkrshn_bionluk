import formidable from "formidable";
import { NextApiRequest } from "next";

export const parseForm = async (req:NextApiRequest): Promise<{fields: formidable.Fields; files: formidable.Files}> => {
    return new Promise(async (resolve, reject) => {
        resolve({
            files:{},
            fields:{}
        })
    })
}