"use client"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

export default function CommmentComponent({postId, comments}:{postId:string, comments:any}) {
    return (
        <div className="w-full bg-white rounded-lg p-3" >
            <div className="commentList">
                <ul>
                    {
                        comments.map((item:any, index:number) => (
                            <li className="flex flex-1 flex-col gap-3  border-b text-sm p-4" key={index} >
                                <span className="text-gray-400 italic" >    
                                    <FontAwesomeIcon icon={faCalendarAlt} /> {item.name}{item.surname} - {item.createdAt}
                                </span>
                                <span>
                                    {item.comment}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="add-comment flex flex-1 justify-center items-center mt-5 border-t ">
                <Formik initialValues={{
                    name: "",
                    surname: "",
                    comment: ""
                }} onSubmit={async (values:any, {resetForm}) => {
                    values.postId = postId
                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/home/addComment', {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(values)
                    })

                    const {ok} = await res.json()

                    if (ok) toast.success('Yorum başarıyla gönderildi')
                    else toast.warning('Yorum gönderilirken sorun meydana geldi')
                    resetForm()
                }} >
                    <Form className="w-full mt-5 text-sm" >
                        <div className="row flex flex-1 gap-5">
                            <Field name="name" id="comment" placeholder="Adınız" className="form-element bg-gray-100" autoComplete="off" />
                            <Field name="surname" id="comment" placeholder="Soyadınız" className="form-element bg-gray-100" autoComplete="off" />
                        </div>
                        <div className="row mt-5">
                            <Field name="comment" id="comment" >
                                {({ field, form }: { field: any, form: any }) => (
                                    <textarea
                                        name="comment"
                                        id="comment"
                                        className="form-element bg-gray-100"
                                        placeholder="Yorumunuz"
                                        onChange={(event: any) => {
                                            form.setFieldValue('comment', event.target.value)
                                        }}
                                    ></textarea>
                                )}
                            </Field>
                        </div>
                        <div className="row text-center mt-5">
                            <p className="text-red-200 mb-3" >
                                Yorumlarınız editörlerin incelemesinden sonra yayınlanacaktır.
                            </p>
                            <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-400 duration-200" type="submit">
                                Yorumu Gönder
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}