"use client"
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import cloudinaryUploadSingle from "@/lib/cloudinary";
import { useSession } from "next-auth/react";

export default function ProfileEditContainer({ user }: { user?: any }) {
    const [avatar, setAvatar] = React.useState("")
    const [file, setFile] = React.useState()
    const {data:session}:{data:any} = useSession()

    return (
        <div className="profile w-100 min-h-[90vh] flex items-center justify-center">
            <div className="profile-card w-1/2 custom-card-style">
                <div className="avatar text-center mt-10 mb-10 flex justify-center">
                    <Image src={avatar ? avatar : user?.avatar?.url} width={200} height={200} objectFit="cover" alt="Profil" className="rounded-full custom-card-style p-5" />
                </div>
                <div className="content">
                    <Formik initialValues={{
                        name: user?.name,
                        surname: user?.surname,
                        email: user?.email,
                        phone: user?.phone,
                        password: user?.password,
                        gender: user?.gender,
                        jops: user?.jops,
                        country: user?.country,
                        city: user?.city,
                        avatar: null,
                        about: user?.about
                    }}
                    onSubmit={async (values: any) => {
                        try {

                            if (file){
                                const img_url = await cloudinaryUploadSingle(file)
                                values.avatar = img_url                            
                            }

                            values.userId = session?.user?.id
                            const res = await fetch('/api/user/' + user?.id, {
                                method: 'PUT',
                                headers: {
                                    "content-type":"application/json"
                                },
                                body: JSON.stringify(values)
                            })

                            const {ok} = await res.json()

                            if (ok) toast.success("Kullanıcı başarı ile güncellendi")
                            else toast.warning("Kullanıcı güncellenirken bir sorun meydana geldi.")

                        } catch (err) {
                            toast.dark('Güncelleme işlemi başarısız. Lütfen tekrar deneyin.', {
                                icon: 'error'
                            })
                        }

                    }} >
                        <Form className="flex flex-col gap-5" >
                            <div className="row flex flex-1 gap-5">
                                <Field
                                    name="name"
                                    id="name"
                                    placeholder="Adınız"
                                    className="form-element"
                                    autoComplete="off"
                                />
                                <Field
                                    name="surname"
                                    id="surname"
                                    placeholder="Soyadınız"
                                    className="form-element"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="row flex flex-1 gap-5">
                                <Field
                                    name="phone"
                                    id="phone"
                                    placeholder="Telefon Nu."
                                    className="form-element"
                                    autoComplete="off"
                                />
                                <Field
                                    name="email"
                                    id="email"
                                    placeholder="Mail Adresi"
                                    className="form-element"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="row flex flex-1 gap-5">
                                <Field
                                    name="password"
                                    id="password"
                                    placeholder="Şifreniz"
                                    className="form-element bg-red-50"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="row flex flex-1 gap-5">
                                <Field name="gender" component="select" className="form-element"  >
                                    <option value="n">Cinsiyetiniz</option>
                                    <option value="e">Erkek</option>
                                    <option value="k">Kadın</option>
                                    <option value="n">Belirtmek İstemiyorum</option>
                                </Field>
                                <Field
                                    name="jops"
                                    id="jops"
                                    placeholder="Mesleğiniz"
                                    className="form-element"
                                />
                            </div>
                            <div className="row flex flex-1 gap-5">
                                <Field
                                    name="country"
                                    id="country"
                                    className="form-element"
                                    placeholder="Yaşadığınız Ülke"
                                />
                                <Field
                                    name="city"
                                    id="city"
                                    className="form-element"
                                    placeholder="Yaşadığınız Şehir"
                                />
                            </div>
                            <div className="row flex flex-1">
                                <Field name="avatar">
                                    {({ field, form }: { field: any, form: any }) => (
                                        <input type="file" name="avatar" onChange={(event: any) => {
                                            const file = event.currentTarget.files[0]
                                            setFile(file) // File set state
                                            if (!file || !['image/jpeg', 'image/png'].includes(file?.type)) toast.warning('Resim beklenen formatta değil.')
                                            form.setFieldValue('avatar', file)
                                            const reader = new FileReader()

                                            reader.onload = (e: any) => {
                                                setAvatar(e?.target?.result)
                                            }
                                            reader.readAsDataURL(file)
                                        }} />
                                    )}
                                </Field>
                            </div>
                            <div className="row flex flex-1 gap-5">
                                <Field name="about" >
                                    {({ field, form }: { field: any, form: any }) => (
                                        <textarea
                                            name="about"
                                            id="about"
                                            placeholder="Hakkımda (En fazla 255 karakter)"
                                            className="form-element rounded-lg"
                                            onChange={(e:any) => {
                                                form.setFieldValue("about", e.target.value)
                                            }}>
                                            {user?.about}
                                        </textarea>
                                    )}
                                </Field>
                            </div>
                            <div className="row text-center">
                                <button className="btn-secondary" type="submit">
                                    Profilimi Güncelle
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}