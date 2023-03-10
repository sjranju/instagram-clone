/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import logo from '../images/instagramWhiteLogo.png'
// import { CgHome } from 'react-icons/cg'
import { RiSearchLine, RiMessengerLine } from 'react-icons/ri'
import { MdHomeFilled, MdOutlineExplore } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import { FiPlusSquare } from 'react-icons/fi'
import * as ROUTES from '../constants/routes'

function Sidebar() {
    return (
        <div className='flex flex-col justify-between mx-auto text-white pr-1 text-lg relative'>
            <div className="md pt-10 h-20 w-28 pb-5 mb-5 pl-3">
                <img src={logo} alt="logo" color={'white'} className='text-white' />
            </div>
            <div className="flex flex-col items-start ">
                <div className="flex flex-col">
                    <Link to={ROUTES.DASHBOARD} className='hover:rounded-2xl hover:bg-hoverBackground p-3 mb-1'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><MdHomeFilled size={24} className='sm:fill-red' /></div>
                            <div className="font-bold">Home</div>
                        </div>
                    </Link>
                    <Link to={ROUTES.DASHBOARD} className='hover:rounded-2xl hover:bg-hoverBackground p-3'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><RiSearchLine size={24} /></div>
                            <div className="">Search</div>
                        </div>
                    </Link>
                    <Link to={ROUTES.PROFILE} className='hover:rounded-2xl hover:bg-hoverBackground p-3'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><MdOutlineExplore size={24} /></div>
                            <div className="">Explore</div>
                        </div>
                    </Link>
                    <Link to={ROUTES.LOGIN} className='hover:rounded-2xl hover:bg-hoverBackground p-3'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><RiSearchLine size={24} /></div>
                            <div className="">Search</div>
                        </div>
                    </Link>
                    <Link to={ROUTES.LOGIN} className='hover:rounded-2xl hover:bg-hoverBackground p-3'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><RiMessengerLine size={24} /></div>
                            <div className="">Messages</div>
                        </div>
                    </Link>
                    <Link to={ROUTES.LOGIN} className='hover:rounded-2xl hover:bg-hoverBackground p-3'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><AiOutlineHeart size={24} /></div>
                            <div className="">Notifications</div>
                        </div>
                    </Link>
                    <Link to={ROUTES.LOGIN} className='hover:rounded-2xl hover:bg-hoverBackground p-3'>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><FiPlusSquare size={24} /></div>
                            <div className="">Create</div>
                        </div>
                    </Link>
                </div>
                <div className="flex">
                    <Link to={ROUTES.LOGIN} className='sticky hover:rounded-2xl hover:bg-hoverBackground p-3 '>
                        <div className="flex flex-row space-x-2">
                            <div className="flex justify-center items-center h-6 w-6"><AiOutlineMenu size={24} /></div>
                            <div className="">More</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
