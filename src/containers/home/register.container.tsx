"use client"
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { toast } from "react-toastify";

export default function RegisterContainer() {
    return (
        <div className="grid grid-cols-12 min-h-[70vh] mt-10" >
            <div className="register-description col-span-12 lg:col-span-7 flex flex-1 justify-center items-center">
                <Image src="/images/registerBanner.png" width={550} height={550} className="object-cover" alt="" />
            </div>
            <div className="register-form col-span-12 lg:col-span-5  mt-10 lg:mt-auto mb-auto p-3 lg:p-0">
                <div className="title text-center mb-10">
                    <h1 className="text-2xl" >
                        Hemen Yazar Ol
                    </h1>
                </div>
                <Formik initialValues={{
                    name: "",
                    surname: "",
                    gender: "",
                    jops:"",
                    born_date: "",
                    country: "",
                    city: "",
                    password: "",
                    email:"",
                    phone:""
                    
                }} onSubmit={async (
                    values, {resetForm}
                ) => {
                    const res = await fetch('/api/user/register', {
                        method:'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body:JSON.stringify(values)
                    })

                    const {ok} = await res.json()

                    if (ok){
                        toast.success('Yazar isteği başarı ile oluşturuldu.')
                    }else{
                        toast.error('Yazar isteği oluşturulurken bir hata oluştu.')
                    }

                    
                    resetForm()
                }} >
                    <Form className="flex flex-1 flex-col gap-5" >
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" name="name" id="name" placeholder="Adınız" autoComplete="off" />
                            <Field className="form-element" name="surname" id="surname" placeholder="Soyadınız" autoComplete="off" />
                        </div>
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" component="select" name="gender" id="gender" defaultValue="" >
                                <option value="" selected={true}>Cinsiyetiniz</option>
                                <option value="e">Erkek</option>
                                <option value="k">Kadın</option>
                                <option value="n">Belirtmek İstemiyorum</option>
                            </Field>
                            <Field className="form-element" name="jops" id="jops" placeholder="Mesleğiniz" autoComplete="off" />
                        </div>
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" name="email" id="email" placeholder="Mail Adresi" autoComplete="off" />
                            <Field className="form-element" name="phone" id="phone" placeholder="Telefon Nu." autoComplete="off" />
                        </div>
                        <Field name="born_date">
                            {({ field, form }: { field: any, form: any }) => (
                                <DatePicker
                                    {...field}
                                    className="form-element"
                                    dateFormat="dd/MM/yyyy"
                                    selected={field.value}
                                    onChange={(date: any) => form.setFieldValue("born_date", date)}
                                    placeholderText="Doğum Tarihiniz" />
                            )}
                        </Field>
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" name="country" id="country" placeholder="Yaşadığınız Ülke" autoComplete="off" />
                            <Field className="form-element" name="city" id="city" placeholder="Yaşadığınız Şehir" autoComplete="off" />
                        </div>

                        <div className="row">
                            <Field className="form-element" name="password" id="password" placeholder="Şifreniz" autoComplete="off" />
                        </div>

                        <div className="row text-center">
                            <button className="btn-secondary" >
                                Başvuru Yap
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}