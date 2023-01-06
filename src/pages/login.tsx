/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import photoframe from '../images/mainPage/blackPhoneFrame5.png'
// import photoframe from '../images/iphone-with-profile.jpg'
import logo from '../images/logo.png'
// import img1 from '../images/mainPage/img1.png'

const Login = () => {
    const handleLogin = (): string => {
        return 'a'
    }

    return (
        <div className='container flex mx-auto max-w-screen-md space-x-12 items-center h-screen'>
            <div className='flex w-3/5'>
                <div className="backgroundimg top-0">
                    <img src={photoframe} className='phoneframe' />
                    {/* <img src={img1} className='image1' /> */}
                    <div className="image1"></div>
                </div>
                {/* <div id="container">
                    <div id="navi"><img src={photoframe} className='phoneframe' /></div>
                    <div id="infoi">
                        <img src={img1} className='image1' />b
                    </div>
                </div> */}
            </div>
            <div className='flex flex-col w-2/5 space-y-12 text-center'>
                <img src={logo} />
                <div>
                    <form action={handleLogin()} className="space-y-4">
                        <input
                            aria-label='Enter email address'
                            type="text"
                            placeholder="Email address"
                            className='text-gray text-sm w-full rounded-sm border border-gray-700 p-1' />
                        <input
                            aria-label='Enter your password'
                            type="password"
                            placeholder="Password"
                            className='text-gray text-sm w-full rounded-sm border border-gray-700 p-1' />
                        <button className='bg-blueDisabledButton w-full rounded-md py-1 text-white'>Log in</button>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default Login
