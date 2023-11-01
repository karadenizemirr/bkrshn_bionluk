import ProfileEditContainer from "@/containers/user/profile/profile.edit.container";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

const getUser = async () => {
    try{
        const session:any = await getServerSession(authOption)
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/' + session?.user.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const {user} = await res.json()
        return user
    }catch(err){
        return []
    }
}


export default async function ProfilePage(){
    const user = await getUser()
    return (
        <div>
            <ProfileEditContainer user={user} />
        </div>
    )
}