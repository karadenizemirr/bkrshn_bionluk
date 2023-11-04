"use client"
import { sliceText, toDate } from "@/lib/parser";
import { faBars, faCaretDown, faClose, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function NavbarComponent({ categories, posts }: { categories?: any, posts?: any }) {

    const { data: session }: { data: any } = useSession();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false)
    const [postIndex, setPostIndex] = useState(0)
    const [mobileToggle, setMobileToggle] = useState(false)
    const [searchModal, setSearchModal] = useState(false)

    const [searchText, setSearchText] = useState("")
    const router = useRouter()
    const handleSearch = () => {
        const routerUrl: any = `/search?queryy=${slugify(searchText, { lower: true, replacement: '-' })}`
        router.push(routerUrl)
        setSearchModal(false)
    }

    const handleInputChange = (e: any) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        let duration = posts.length
        setTimeout(() => {
            setPostIndex(postIndex + 1)

            if (postIndex === duration) {
                setPostIndex(0)
            }
        }, 3000)
    }, [postIndex])


    const handleToggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleCategoryToggleMenu = () => {
        setCategoryOpen(!categoryOpen)
    }

    const handleMobileToggle = () => {
        setMobileToggle(!mobileToggle)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 8,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    return (
        <>
            <div className="mobileMneuToggler flex flex-1 items-center justify-between p-3 lg:hidden">
                <div className="logo">
                    <Link href="/" className="text-2xl font-bold" >
                        bkrshn
                    </Link>
                </div>
                <div className="menu flex gap-5 items-center">
                    {
                        session?.user && (
                            <Link href="/user/post/add" className="btn-primary text-sm" >
                                Yazı Ekle
                            </Link>
                        )
                    }
                    <FontAwesomeIcon icon={faBars} className="text-xl cursor-pointer" onClick={handleMobileToggle} />
                </div>
            </div>

            {
                mobileToggle && (
                    <div className="mobileMenu absolute top-0 w-full h-[100vh] bg-primary z-50 text-white p-5">
                        <div className="topbar flex flex-1 justify-between items-center">
                            <Link href="/login" className="btn-secondary text-black py-2 text-sm" onClick={handleMobileToggle}>
                                Giriş Yap
                            </Link>
                            <FontAwesomeIcon icon={faClose} onClick={handleMobileToggle} />
                        </div>
                        <div className="menu flex flex-1 items-center justify-center mt-10 m-10">
                            <ul className="flex flex-col gap-4 items-center" >
                                <li className="p-2" >
                                    <Link href="/" onClick={handleMobileToggle} >
                                        Anasayfa
                                    </Link>
                                </li>
                                <li className="p-2" >
                                    <Link href="/about" onClick={handleMobileToggle} >
                                        Hakkımızda
                                    </Link>
                                </li>
                                <li className="p-2" >
                                    <Link href="/contact" onClick={handleMobileToggle} >
                                        İletişim
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="authMnu border-t">
                            {
                                session?.user?.role === 'user' ? (
                                    <>
                                        <ul className="flex flex-1 flex-col gap-4 items-center mt-10" >
                                            <li className="p-2 hover:bg-gray-300 duration-200">
                                                <Link href="/user/post/add" onClick={handleMobileToggle} >
                                                    Yazı Ekle
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200">
                                                <Link href="/user/post/list" onClick={handleMobileToggle} >
                                                    Yazılarım
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href={`/user/profile/${session?.user?.id}`} onClick={handleMobileToggle} >
                                                    Profilim
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="#" onClick={() => { signOut() }}>
                                                    Çıkış Yap
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                ) : session?.user?.role === 'editor' ? (
                                    <>
                                        <ul className="flex flex-1 flex-col gap-4 items-center mt-10" >
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/editor/posts" onClick={handleMobileToggle} >
                                                    Yazılar
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/editor/comments" onClick={handleMobileToggle} >
                                                    Yorumlar
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/editor/category" onClick={handleMobileToggle} >
                                                    Kategoriler
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="#" onClick={() => { signOut() }} >
                                                    Çıkış Yap
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                ) : session?.user?.role === 'admin' ? (
                                    <>
                                        <ul className="flex flex-1 flex-col gap-4 items-center mt-10" >
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/admin/user" onClick={handleMobileToggle} >
                                                    Kullanıcılar
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/editor/posts" onClick={handleMobileToggle} >
                                                    Yazılar
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/editor/comments" onClick={handleMobileToggle} >
                                                    Yorumlar
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="/editor/category" onClick={handleMobileToggle} >
                                                    Kategoriler
                                                </Link>
                                            </li>
                                            <li className="p-2 hover:bg-gray-300 duration-200" >
                                                <Link href="#" onClick={() => { signOut() }}>
                                                    Çıkış Yap
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                ) : ""
                            }
                        </div>
                    </div>
                )
            }
            <div className="w-full overflow-clip" >
                <div className="navbar-container bg-white p-5 hidden lg:block border-b">
                    <nav className="grid grid-cols-12 items-center px-5">
                        <div className="logo col-span-2">
                            <Link href="/" className="text-2xl font-bold" >
                                bkrshn
                            </Link>
                        </div>
                        <div className="menu col-span-6">
                            <ul className="flex flex-1 gap-10" >
                                <li>
                                    <Link href="/" >
                                        Anasayfa
                                    </Link>
                                </li>
                                {/* <li className="relative bg-white z-50 cursor-pointer" onMouseEnter={handleCategoryToggleMenu} onMouseLeave={handleCategoryToggleMenu}>
                                    <span>
                                        Kategoriler <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                    {
                                        categoryOpen && (
                                            <div className="dropdown absolute bg-white shadow-md w-auto p-3 rounded-lg">
                                                <ul className="flex flex-1 flex-col gap-4" >
                                                    {
                                                        categories.map((item: any, index: number) => (
                                                            <li key={index} className="p-2 hover:bg-gray-300 duration-200" >
                                                                <Link href="/" >
                                                                    {item.title}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </li> */}
                                <li>
                                    <Link href="/about" >
                                        Hakkımızda
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" >
                                        İletişim
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="buttonGroup col-span-4 flex flex-1 justify-end gap-10 items-center">
                            {
                                session?.user?.role === 'user' ? (
                                    <div className="relative" onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu}  >
                                        <FontAwesomeIcon icon={faSearch} className="searchButton cursor-pointer mr-5" onClick={() => { setSearchModal(true) }} />
                                        <Link href="/user/post/add" className="btn-primary" >
                                            Yazı Ekle
                                        </Link>
                                        {
                                            isOpen && (
                                                <div className="toggle absolute bg-white p-5 shadow-md rounded-lg z-50 ">
                                                    <ul className="flex flex-1 flex-col gap-4" >
                                                        <li className="p-2 hover:bg-gray-300 duration-200">
                                                            <Link href="/user/post/list" >
                                                                Yazılarım
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href={`/user/profile/${session?.user?.id}`} >
                                                                Profilim
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="#" onClick={() => { signOut() }}>
                                                                Çıkış Yap
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : session?.user?.role === 'editor' ? (
                                    <div className="relative" onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu} >
                                        <button className="btn-primary" >
                                            Menu
                                        </button>
                                        {
                                            isOpen && (
                                                <div className="toggle absolute bg-white p-5 shadow-md rounded-lg z-50">
                                                    <ul className="flex flex-1 flex-col gap-4" >
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/editor/posts" >
                                                                Yazılar
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/editor/comments" >
                                                                Yorumlar
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/editor/category" >
                                                                Kategoriler
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="#" onClick={() => { signOut() }}>
                                                                Çıkış Yap
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                        <FontAwesomeIcon icon={faSearch} className="searchButton cursor-pointer" onClick={() => { setSearchModal(true) }} />
                                    </div>
                                ) : session?.user?.role === 'admin' ? (
                                    <div className="relative" onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu} >
                                        <button className="btn-primary" >
                                            Dashboard
                                        </button>
                                        {
                                            isOpen && (
                                                <div className="toggle absolute bg-white p-5 shadow-md rounded-lg z-50">
                                                    <ul className="flex flex-1 flex-col gap-4" >
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/admin/user" >
                                                                Kullanıcılar
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/editor/posts" >
                                                                Yazılar
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/editor/comments" >
                                                                Yorumlar
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="/editor/category" >
                                                                Kategoriler
                                                            </Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-300 duration-200" >
                                                            <Link href="#" onClick={() => { signOut() }}>
                                                                Çıkış Yap
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                        <FontAwesomeIcon icon={faSearch} className="searchButton cursor-pointer" onClick={() => { setSearchModal(true) }} />
                                    </div>
                                ) : (
                                    (
                                        <>
                                            <Link href="/register" >
                                                Yazar Ol
                                            </Link>
                                            <Link href="/login" className="btn-primary" >
                                                Giriş Yap
                                            </Link>
                                            <FontAwesomeIcon icon={faSearch} className="searchButton cursor-pointer" onClick={() => { setSearchModal(true) }} />
                                        </>
                                    )
                                )
                            }
                        </div>
                    </nav>
                </div>
                <div className="endPost px-5 border-b py-5">
                    {/* <div className="endPost bg-white px-5 rounded-lg w-full h-[14vh] lg:h-auto  ">
                        <div className="latest flex flex-col lg:flex-row items-center gap-2 justify-between md:flex-1">
                            <div className="post">
                                <span className="text-sm italic">
                                    {toDate(posts[postIndex]?.createdAt)}
                                </span>
                            </div>
                            <span className="postname ml-2 text-primary text-lg lg:text-sm">
                                <Link href={'/post/detail/' + posts[postIndex]?.id}>
                                    {posts[postIndex]?.title}
                                </Link>
                            </span>
                            <Link href={'/profile/' + posts[postIndex]?.user?.id} >
                                <span className=" text-sm italic ml2" >
                                    {posts[postIndex]?.user?.name}&nbsp;{posts[postIndex]?.user?.surname}
                                </span>
                            </Link>
                        </div>
                    </div> */}
                    <div className="w-full ">
                        <p className="text-xl leading-none text-gray-800 py-4 px-5">En Yeniler..</p>
                        <Slider
                            {...settings}
                        >
                            {posts.map((item: any, index: number) => (
                                <div className="flex flex-col items-center justify-center space-y-1 " key={index}>
                                    <div className="hover:bg-gray-200 duration-200 p-1 rounded-full text-center">
                                        <Link className="bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href={`/post/detail/${item?.id}`}>
                                            <img className="h-14 w-14 rounded-full" src={item?.image[0]?.url} alt="cute kitty" />
                                        </Link>
                                    </div>
                                    <Link href={`/post/detail/${item?.id}`} className="text-center">
                                        {sliceText(item?.title, 10)}
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            {
                searchModal && (
                    <div className="searchContainer absolute top-0 w-full bg-white h-[100vh] z-50 animate__animated animate__backInDown">
                        <div className="topbar absolute right-10 top-10">
                            <span>
                                <FontAwesomeIcon icon={faClose} onClick={() => { setSearchModal(false) }} className="cursor-pointer" />
                            </span>
                        </div>
                        <div className="content flex flex-1 flex-col items-center justify-center h-full mb-10 gap-10">
                            <h1 className="text-4xl" >
                                Aklınızda Kalmasın Arayın Bulun..
                            </h1>
                            <input type="text" className="border p-3 w-1/2" placeholder="Arama Yap" onChange={handleInputChange} />
                            <button className="bg-black text-white p-3 rounded-lg" onClick={handleSearch} >
                                Arama Yap
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}