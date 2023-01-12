/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import photoframe from '../images/mainPage/blackPhoneFrame5.png'
// import photoframe from '../images/iphone-with-profile.jpg'
import logo from '../images/logo.png'
import img1 from '../images/mainPage/img1.png'
import img2 from '../images/mainPage/img2.png'
import img3 from '../images/mainPage/img3.png'
import img4 from '../images/mainPage/img4.png'
import gplay from '../images/mainPage/gplay.png'
import ms from '../images/mainPage/ms.png'

const Login = () => {
    const imageList: string[] = [img1, img2, img3, img4]

    const [userName, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [imageCounter, setImageCounter] = useState<number>(0)

    const handleLogin = (): string => {
        return 'a'
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // eslint-disable-next-line array-callback-return
            imageList?.map((image1) => {
                if (imageCounter === 3) {
                    setImageCounter(0)
                } else { setImageCounter(imageCounter + 1) }
            })
        }, 3600)
        return () => {
            clearInterval(interval)
        }
    }, [imageCounter])

    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='flex w-3/5'>
                <div className="backgroundimg top-0">
                    <img src={photoframe} className='phoneframe' />
                    {
                        <img src={imageList[imageCounter]} className='image1' />
                    }
                </div>
            </div>
            <div className="flex flex-col w-2/5 space-y-3 text-center">
                <div className='flex flex-col space-y-10 text-center bg-white border border-inputBorder rounded-sm p-10'>
                    <img src={logo} className='h-13 w-42' />
                    <div>
                        <form action={handleLogin()} className="space-y-4">
                            <input
                                aria-label='Enter email address'
                                type="text"
                                placeholder="Email address"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder p-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your password'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder p-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <button className='bg-blueDisabledButton w-full rounded-md py-1 text-white'>Log in</button>
                        </form>
                    </div>
                </div>
                <div className="text-sm text-center bg-white border border-gray-300 rounded-sm p-5">Dont have an account? <span className='text-signUpColor text-bold font-medium'>Sign Up</span></div>
                <div className="text-sm">
                    Get the app.
                </div>
                <div className="flex flex-row space-x-3 justify-center">
                    <img src={gplay} alt='google play' className='h-10' />
                    <img src={ms} alt='microsoft' className='h-10 ' />
                </div>
            </div>
        </div >
    )
}

export default Login
