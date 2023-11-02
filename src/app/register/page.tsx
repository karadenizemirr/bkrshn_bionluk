import RegisterContainer from "@/containers/home/register.container";
import { Metadata } from 'next'

export const metadata:Metadata = {
  title:'Kayıt Ol'
}

export default function RegisterPage(){
    return (
        <div className="container mx-auto" >
            <RegisterContainer />
        </div>
    )
}