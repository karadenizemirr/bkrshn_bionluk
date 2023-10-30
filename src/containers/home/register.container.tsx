"use client"
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function RegisterContainer() {
    return (
        <div className="grid grid-cols-12 h-[70vh] mt-10" >
            <div className="register-description col-span-7 flex flex-1 justify-center items-center">
                <Image src="/images/registerBanner.png" width={850} height={850} className="object-cover" alt="" />
            </div>
            <div className="register-form col-span-5 mt-auto mb-auto">
                <div className="title text-center mb-10">
                    <h1 className="text-2xl" >
                        Hemen Yazar Ol
                    </h1>
                </div>
                <Formik initialValues={{
                    name: ""
                }} onSubmit={() => { }} >
                    <Form className="flex flex-1 flex-col gap-5" >
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" name="name" id="name" placeholder="Adınız" autoComplete="off" />
                            <Field className="form-element" name="surname" id="surname" placeholder="Soyadınız" autoComplete="off" />
                        </div>
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" component="select" name="gender" id="gender" >
                                <option value="" selected={true}>Cinsiyetiniz</option>
                                <option value="e">Erkek</option>
                                <option value="k">Kadın</option>
                                <option value="n">Belirtmek İstemiyorum</option>
                            </Field>
                            <Field className="form-element" name="surname" id="surname" placeholder="Mesleğiniz" autoComplete="off" />
                        </div>
                        <Field name="birth_date">
                            {({ field, form }: { field: any, form: any }) => (
                                <DatePicker
                                    {...field}
                                    className="form-element"
                                    dateFormat="dd/MM/yyyy"
                                    selected={field.value}
                                    onChange={(date: any) => form.setFieldValue("birth_date", date)}
                                    placeholderText="Doğum Tarihiniz" />
                            )}
                        </Field>
                        <div className="row flex flex-1 gap-4">
                            <Field className="form-element" name="name" id="name" placeholder="Yaşadığınız Ülke" autoComplete="off" />
                            <Field className="form-element" name="surname" id="surname" placeholder="Yaşadığınız Şehir" autoComplete="off" />
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