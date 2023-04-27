/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
// import { CgHome } from 'react-icons/cg'
import { RiSearchLine, RiMessengerLine } from 'react-icons/ri'
import { BsInstagram } from 'react-icons/bs'
import { WiTime8 } from 'react-icons/wi'
import { MdHomeFilled, MdOutlineExplore, MdOutlineBookmarkBorder } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import { FiPlusSquare } from 'react-icons/fi'
import { IoIosSettings } from 'react-icons/io'
import { HiOutlineMoon } from 'react-icons/hi'
import { TbMessageReport } from 'react-icons/tb'
import * as ROUTES from '../constants/routes'
// import { UserContext } from '../context/user'
import { auth, storage } from '../lib/firebaseConfig'
import { signOut } from 'firebase/auth'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { useAppSelector } from '../store/use-state-dispatch'
const scaleUpICons = 'transition ease-in-out delay-50 group-hover:-translate-y-0.5 group-hover:scale-105 duration-200'

function Menubar() {
    const [clicked, setClicked] = useState(false)
    const userState = useAppSelector(state => state.user.currentUser)
    const navigate = useNavigate()
    // console.log('user', { user })

    const [imageURL, setImageURLs] = useState<string[]>([])
    const [image, setImage] = useState<string>('')

    const menubarImageRef = ref(storage, 'menubar/')
    const avatarImageRef = ref(storage, 'avatars/')

    useEffect(() => {
        listAll(menubarImageRef).then(response =>
            response.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setImageURLs(prev => [...prev, url])
                })

            }
            ))
        if (userState?.username !== undefined) {
            listAll(avatarImageRef).then((response) => {
                response.items.filter(item => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    if (item.name.includes(userState.username!)) {
                        getDownloadURL(item).then(url => setImage(url))
                    }
                })
            })
        }
    }, [])

    console.log(imageURL, 'imageURL');


    const handleSignOut = () => {
        void signOut(auth)
            .then(() => navigate(`${ROUTES.LOGIN}`))
            .catch((error) => console.log('error', error)
            )
    }

    return (
        <div className='relative flex flex-col justify-between mx-auto text-white pr-1 pb-5 text-lg h-screen items-start'>
            <div className="md:block hidden pt-10 h-20 w-28 pb-5 mb-5 pl-3 shrink-0 relative">
                <img src={imageURL.find(img => img.includes('instagramWhiteLogo'))} alt="logo" color={'white'} className='text-white' />
            </div>
            <div className="block md:hidden pt-10 h-20 w-28 pb-5 mb-5 pl-4 shrink-0 relative">
                <BsInstagram size={28} />
            </div>
            <div className="relative flex flex-col grow ">
                <Link to={ROUTES.DASHBOARD} className='group hover:rounded-2xl hover:bg-hoverBackground hover:pr-4 p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2 opacity-100">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><MdHomeFilled size={32} className='hover:fill-red' /></div>
                        <div className="hidden md:block">Home</div>
                    </div>
                </Link>
                <Link to={ROUTES.DASHBOARD} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><RiSearchLine size={28} /></div>
                        <div className="acitve:font-bold hidden md:block">Search</div>
                    </div>
                </Link >
                <Link to={ROUTES.PROFILE} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><MdOutlineExplore size={28} /></div>
                        <div className="acitve:font-bold hidden md:block">Explore</div>
                    </div>
                </Link >
                <Link to={ROUTES.LOGIN} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><img src={imageURL.find(img => img.includes('reelsWhite'))} height={28} width={28}></img></div>
                        <div className="acitve:font-bold hidden md:block">Reels</div>
                    </div>
                </Link >
                <Link to={ROUTES.LOGIN} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><RiMessengerLine size={28} /></div>
                        <div className="acitve:font-bold hidden md:block">Messages</div>
                    </div>
                </Link >
                <Link to={ROUTES.LOGIN} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><AiOutlineHeart size={28} /></div>
                        <div className="acitve:font-bold hidden md:block">Notifications</div>
                    </div>
                </Link >
                <Link to={ROUTES.LOGIN} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2 ">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><FiPlusSquare size={28} /></div>
                        <div className="acitve:font-bold hidden md:block">Create</div>
                    </div>
                </Link >
                <Link to={ROUTES.PROFILE} className='group hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2 ">
                        <img src={image} alt="profile picture" className={`w-7 h-7 rounded-full ${scaleUpICons}`} />
                        <div className="acitve:font-bold hidden md:block">Profile</div>
                    </div>
                </Link>
            </div >

            <div className="flex relative">
                <button onClick={(e) => {
                    e.preventDefault()
                    setClicked(prevState => !prevState)
                }}
                    className='group sticky hover:rounded-2xl hover:bg-hoverBackground p-3 focus:font-semibold'>
                    <div className="flex flex-row space-x-2 justify-center items-center">
                        <div className={`flex justify-center items-center h-6 w-8 focus:bg-white ${scaleUpICons}`}><AiOutlineMenu size={28} /></div>
                        <div className="acitve:font-bold hidden md:block">More</div>
                    </div>
                </button >
                {
                    clicked
                        ? <div className="absolute bottom-16">
                            < div className='absolute w-60 z-10 bottom-0 opacity-100 flex flex-col text-white bg-seperator rounded-md text-sm font-semibold space-y-4 py-2' >
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className="">Settings</div>
                                    <div className=""><IoIosSettings size={28} /></div>
                                </div>
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className="">Your Activity</div>
                                    <div className=""><WiTime8 size={28} /></div>
                                </div>
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className="">Saved</div>
                                    <div className=""><MdOutlineBookmarkBorder size={28} /></div>
                                </div>
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className="">Switch appearance</div>
                                    <div className=""><HiOutlineMoon size={28} /></div>
                                </div>
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className="">Report a problem</div>
                                    <div className=""><TbMessageReport size={28} /></div>
                                </div>
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className="">Switch accounts</div>

                                </div>
                                <div className="flex flex-row justify-between items-center px-4">
                                    <div className=""><button onClick={handleSignOut}>Log out</button></div>

                                </div>
                            </div >
                        </div >
                        : ''
                }
            </div >
        </div >
    )
}

export default Menubar
