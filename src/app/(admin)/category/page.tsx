"use client"
import TableComponent from "@/components/table/table.component";
import { Field, Form, Formik } from "formik";
import React from "react";

export default function CategoryPage() {
    
    return (
        <div className="mt-10 mb-10" >
            <div className="topbar text-center">
                <h1 className="mb-10 text-2xl" >
                    Kategoriler
                </h1>
            </div>
            <div className="addCategory">
                <Formik initialValues={{}} onSubmit={() => {}}>
                    <Form className="mt-10 mb-10">
                        <div className="row flex flex-1 justify-between gap-5">
                            <Field name="title" placeholder="Kategori Adı" className="form-element" />
                            <button className="btn-secondary">
                                Ekle
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="table w-full">
                <TableComponent />
            </div>
        </div>
    )
}