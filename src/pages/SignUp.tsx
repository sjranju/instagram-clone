/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import logo from '../images/logo.png'
import gplay from '../images/mainPage/gplay.png'
import ms from '../images/mainPage/ms.png'
import { AiFillFacebook } from 'react-icons/ai'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SignUp = () => {
    const [userName, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleLogin = (): string => {
        return 'a'
    }

    return (
        <div className='container flex max-w-screen-md justify-center mt-3 mx-auto'>
            <div className="loginContainer flex flex-col space-y-2 text-center">
                <div className='flex flex-col space-y-3 text-center bg-white border border-inputBorder rounded-sm p-10'>
                    <img src={logo} className='h-12 w-42 m-auto' />
                    <div className="text-signUpComments font-semibold text-md">Sign up to see photos and videos from your friends.</div>
                    <div className="flex justify-center">
                        <button className="font-semibold text-white w-full bg-signUpColor py-2 px-4 border rounded-lg text-sm">
                            <span className='relative top-1 inline-block mr-2'><AiFillFacebook className='h-5 w-5' /></span>
                            Log in with Facebook
                        </button>
                    </div>
                    <div className="relative flex py-5 items-center opacity-100">
                        <div className="flex-grow border-t border-inputBorder"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold text-activeBorderForInput ">OR</span>
                        <div className="flex-grow border-t border-inputBorder"></div>
                    </div>

                    <div className=''>
                        <form action={handleLogin()}>
                            <input
                                aria-label='Email address'
                                type="text"
                                placeholder="Email address"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder py-2 px-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your full Name'
                                type="text"
                                placeholder="Full Name"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your username'
                                type="text"
                                placeholder="Username"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your password'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                        </form>
                        <div className="text-xs flex flex-col mt-4 space-y-2 w-full">
                            <div className="text-signUpComments">
                                People who use our service may have uploaded your contact information to Instagram. <span className='text-black'><a href='#'>Learn more</a></span>
                            </div>
                            <div className="text-signUpComments">
                                By signing up, you agree to our <span className='text-black'><a href='#'>Terms,</a></span><span className='text-black'><a href='#'> Privacy Policy</a></span> and <span className='text-black'><a href='#'> Cookies Policy.</a></span>
                            </div>
                        </div>
                        <button className='bg-blueDisabledButton w-full rounded-md py-1 mt-4 mb-4 text-white'>Log in</button>
                    </div>
                </div>
                <div className="text-sm text-center bg-white border border-gray-300 rounded-sm p-5">Have an account?
                    <span className='text-signUpColor text-bold font-medium'> Login</span>
                </div>
                <div className="space-y-6 ">
                    <div className="text-sm mt-2">
                        Get the app.
                    </div>
                    <div className="flex flex-row space-x-3 justify-center">
                        <img src={gplay} alt='google play' className='h-10' />
                        <img src={ms} alt='microsoft' className='h-10 ' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUp
