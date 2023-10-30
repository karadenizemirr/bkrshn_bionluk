"use client"
import { Field, Form, Formik } from "formik";
import React from "react";

export default function ContactContainer(){
    return (
        <div className="w-100 h-[70vh] flex flex-1 items-center justify-center" >
            <div className="contactContainer w-1/2 shadow-lg p-10 shadow-gray-200 rounded-xl">
                <div className="title text-center mb-7">
                    <h1 className="text-2xl" >
                        Bizimle İletişime Geçin
                    </h1>
                </div>
                <Formik initialValues={{}} onSubmit={() => {}} >
                    <Form className="flex flex-col gap-5" >
                        <div className="row flex flex-1 gap-5">
                            <Field name="name" placeholder="Adınız" autocomplete="off" className="form-element" />
                            <Field name="surname" placeholder="Soyadınız" autocomplete="off" className="form-element" />
                        </div>
                        <div className="row flex flex-1 gap-5">
                            <Field name="email" placeholder="Mail Adresi" autocomplete="off" className="form-element" />
                            <Field name="phone" placeholder="Telefon Nu." autocomplete="off" className="form-element" />
                        </div>
                        <div className="row">
                            <Field name="title" placeholder="Başlık" autocomplete="off" className="form-element" />
                        </div>
                        <div className="row">
                            <Field>
                                {({field, form}: {field:any, form:any}) => (
                                    <textarea name="" id="" cols={10} rows={5} placeholder="Mesajınız" className="form-element rounded-lg"></textarea>
                                )}
                            </Field>
                        </div>
                        <div className="row text-center">
                            <button className="btn-secondary">
                                Mesaj Gönder
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}