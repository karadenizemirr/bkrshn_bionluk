"use client"
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginContainer(){
    return (
        <div className="grid grid-cols-12 h-[70vh]" >
            <div className="col-span-5 mt-auto mb-auto">
                <div className="title text-center mb-5  ">
                    <h1 className="text-2xl" >
                        Yazar Girişi
                    </h1>
                </div>
                <Formik initialValues={{
                    email: "",
                    password: ""
                }} onSubmit={(values:any) => {
                    signIn('credentials', {
                        email:values.email,
                        password:values.password,
                        callbackUrl: "/"
                    })
                }} >
                    <Form className="flex flex-col gap-5" >
                        <div className="row flex flex-1 gap-4">
                            <Field name="email" id="email" placeholder="Email" className="form-element" autocomplete="off" />
                            <Field name="password" id="password" placeholder="Şifre" className="form-element" autocomplete="off" />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-5">
                            <button className="btn-secondary">
                                Giriş Yap
                            </button>
                            <p>
                                Henüz yazar hesabınız yok mu ? <Link href="/" className="text-blue-500" >Başvuru Yap</Link>
                            </p>
                            <Link href="/" className="text-blue-500" >
                                Şifremi Unuttum
                            </Link>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="col-span-7">
                text
            </div>  
        </div>
    )
}