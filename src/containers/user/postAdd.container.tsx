"use client"
import { Field, Form, Formik } from "formik";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostAddContainer() {
    const [val, setVal] = React.useState("");
    return (
        <div className="mt-10" >
            <div className="title text-center">
                <h1 className="text-2xl" >
                    Yazı Ekle
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

                    <Formik initialValues={{}} onSubmit={() => { }} >
                        <Form className="mt-10" >
                            <div className="row flex flex-1 gap-5" >
                                <Field name="title" id="title" placeholder="Seo Başlığı" className="form-element" />
                                <Field name="keywords" id="keywords" placeholder="Anahtar Kelimeler" className="form-element" />
                            </div>
                            <div className="row flex flex-1 gap-5 mt-5">
                                <Field name="file" placeholder="Kapak Fotoğrafı" className="form-element"  />
                            </div>
                            <div className="row text-center mt-5">
                                <button className="btn-secondary" >
                                    Yazıyı Kaydet
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}