"use client"
import cloudinaryUploadSingle from "@/lib/cloudinary";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";

export default function PostAddContainer({ categories, data=[] }: { categories?: any, data?: any }) {
    const [val, setVal] = React.useState(data[0]?.content);
    const [file, setFile] = React.useState()

    const [isUpdate, setIsUpdate] = React.useState(false)

    if (data.lengt > 0 ) setIsUpdate(true)

    const { data: session }: { data: any } = useSession()
    return (
        <div className="mt-10" >
            <div className="title text-center">
                <h1 className="text-2xl" >
                    {
                        isUpdate ? `Yazıyı Güncelle` : `Yeni Yazı Oluştur`
                    }
                </h1>
                <p className="text-red-300 italic text-sm mt-4" >
                    Lütfen metinlerinizi kaydetmeden sayfadan çıkış yapmayın.
                </p>
            </div>
            <div className="textContainer mt-10">
                <div className="form ">
                    <ReactQuill
                        value={val}
                        onChange={setVal}
                        placeholder="Yazı İçeriği"
                        className="shadow-md shadow-gray-200 outline-red-200 bg-white p-5 rounded-lg font-regular"
                    />

                    <Formik initialValues={{
                        title: data[0]?.keywords || "",
                        keywords: data[0]?.keywords || "",
                        category: data[0]?.category[0]?.id || ""
                    }} onSubmit={async (values: any) => {
                        // Update

                        if (isUpdate) {
                            // Update

                            if (file) {
                                const upload_files = await cloudinaryUploadSingle(file)
                                values.image = upload_files
                            }
                            values.content = val
                            values.userId = session?.user?.id
                            values.postId = data[0].id
                            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/post', {
                                method: 'PUT',
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(values),
                            })

                            const { ok } = await res.json()

                            if (ok) toast.success('Yazı Başarıyla Güncellendi')
                            else toast.warning('Yazı güncellenirken bir sorun meydana geldi.')


                        } else {
                            // Add
                            if (file) {
                                const upload_files = await cloudinaryUploadSingle(file)
                                values.image = upload_files
                            }

                            values.content = val
                            values.userId = session?.user?.id
                            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/post', {
                                method: 'POST',
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(values),
                            })

                            const { ok } = await res.json()

                            if (ok) toast.success('Yazı Başarıyla Eklendi')
                            else toast.warning('Yazı eklenirken bir sorun meydana geldi.')
                        }
                    }} >
                        <Form className="mt-10" >
                            <div className="row flex flex-1 gap-5" >
                                <Field name="title" id="title" placeholder="Başlık" className="form-element" autoComplete="off" />
                                <Field name="keywords" id="keywords" placeholder="Anahtar Kelimeler" className="form-element" autoComplete="off" />
                                <Field name="category" component="select" className="form-element" >
                                    <option value="">Kategori Seçiniz</option>
                                    {
                                        categories.map((item: any, index: any) => (
                                            <option value={item.id}>
                                                {item.title}
                                            </option>
                                        ))
                                    }

                                </Field>
                            </div>
                            <div className="row flex flex-1 gap-5 mt-5">
                                <Field name="image" >
                                    {({ field, form }: { field: any, form: any }) => (
                                        <input type="file" className="form-element" name="image" onChange={(e: any) => {
                                            const file = e.currentTarget.files[0]
                                            setFile(file)
                                        }} />
                                    )}
                                </Field>
                            </div>
                            <div className="row text-center mt-5">
                                <button className="btn-secondary" type="submit" >
                                    {
                                        isUpdate ? 'Yazıyı Güncelle' : 'Yazıyı Kaydet'
                                    }
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}