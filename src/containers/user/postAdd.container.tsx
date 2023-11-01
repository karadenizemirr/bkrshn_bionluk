"use client"
import cloudinaryUploadSingle from "@/lib/cloudinary";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";

export default function PostAddContainer({ categories, data = [] }: { categories?: any, data?: any }) {
    const [val, setVal] = React.useState(data[0]?.content);
    const [file, setFile] = React.useState()
    const [spinner, setSpinner] = React.useState(false)

    const [isUpdate, setIsUpdate] = React.useState(false)

    if (data.lengt > 0) setIsUpdate(true)

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
                        title: data[0]?.title || "",
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

                            setSpinner(false)
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
                            setSpinner(false)
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
                                            <option value={item.id} key={index} >
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
                                <button className="btn-secondary" type="submit" onClick={() => { setSpinner(true) }} >
                                    {
                                        isUpdate ? (
                                            <>
                                                {
                                                    spinner ? (
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            <span className="sr-only">Yükleniyor...</span>
                                                        </div>
                                                    ) : "Yazıyı Güncelle"
                                                }
                                            </>
                                        ) :

                                            (<>
                                                {
                                                    spinner ? (
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            <span className="sr-only">Yükleniyor...</span>
                                                        </div>
                                                    ) : "Yazıyı Kaydet"
                                                }
                                            </>)
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