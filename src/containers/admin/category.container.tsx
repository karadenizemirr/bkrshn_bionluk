"use client"
import { parseDate } from "@/lib/parser";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function CategoryContainer({ categories }: { categories: any }) {
    return (
        <div className="mt-10 mb-10 mx-auto container p-2 lg:px-20 h-[70vh]" >
            <div className="topbar text-center">
                <h1 className="mb-10 text-2xl" >
                    Kategoriler
                </h1>
            </div>
            <div className="addCategory">
                <Formik initialValues={{
                    title: ''
                }} onSubmit={async (
                    values: any,
                    { resetForm }
                ) => {
                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/admin/category', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })

                    const { ok } = await res.json()

                    if (ok) {
                        toast.success('Kategori Başarıyla Eklendi')
                        resetForm()
                    } else {
                        toast.warning('Kategori Eklenirken Bir Sorun Meydana Geldi')
                    }
                }}>
                    <Form className="mt-10 mb-10">
                        <div className="row flex flex-1 justify-between gap-5">
                            <Field name="title" placeholder="Kategori Adı" className="form-element" />
                            <button className="btn-secondary" type="submit">
                                Ekle
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="table w-full">
                <div className="relative overflow-x-auto shadow-md shadow-gray-200 rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Kategori Adı
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Eklenme Tarihi
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((item: any, index: number) => (
                                    <tr className="bg-white border-b " key={index}>
                                        <td className="px-6 py-4" key={index}>
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4" key={index}>
                                            {parseDate(item.createdAt)}
                                        </td>
                                        <td className="px-6 py-4" >
                                            <Link href="/" className="btn-primary bg-red-400 shadow-none" >
                                                Sil
                                            </Link>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}