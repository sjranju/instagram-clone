/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
import facebook from '../images/mainPage/facebook-icon.png'
import { NavLink } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
// import firebase from '../services/firebase'
import { auth } from '../lib/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const imageList: string[] = [img1, img2, img3, img4]

    const [emailAddress, setEmailAddress] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [imageCounter, setImageCounter] = useState<number>(0)

    const isInvalid = emailAddress === '' || password === ''

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Logged in')

        try {
            void signInWithEmailAndPassword(auth, emailAddress, password)
                .then((userCredential) => console.log(userCredential, 'userCredential')
                )
        } catch (error) {
            console.log(error)
        }

        // return 'a'
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
        <div className='container flex max-w-screen-md items-center justify-center mt-20 mx-auto'>
            <div className='flex'>
                <div className="backgroundimg top-0">
                    <img src={photoframe} className='phoneframe' />
                    {
                        <img src={imageList[imageCounter]} className='image1' />
                    }
                </div>
            </div>
            <div className="loginContainer flex flex-col space-y-2 text-center">
                <div className='flex flex-col space-y-10 text-center bg-white border border-inputBorder rounded-sm p-10'>
                    <img src={logo} className='h-12 w-42 m-auto' />
                    <div className=''>
                        <form>
                            <input
                                aria-label='Enter email address'
                                type="text"
                                placeholder="Email address"
                                value={emailAddress}
                                onChange={e => setEmailAddress(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder py-2 px-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your password'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-1 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <button type='submit' onClick={e => handleLogin} className={`w-full rounded-md py-1 mt-4 text-white ${isInvalid ? 'bg-blueDisabledButton' : 'bg-signUpColor'}`}>Log in</button>
                        </form>

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-inputBorder"></div>
                            <span className="flex-shrink mx-4 text-xs font-semibold text-activeBorderForInput">OR</span>
                            <div className="flex-grow border-t border-inputBorder"></div>
                        </div>

                        <div className="flex flex-row justify-center">
                            <img src={facebook} className='inline-block relative h-4 w-4 mr-3 top-0.5 text-center'></img>
                            <div className="text-center font-semibold text-darkBlue text-sm">Log in with Facebook</div>
                        </div>
                        <div className="relative text-xs top-4">Forgotten your password?</div>
                    </div>
                </div>
                <div className="text-sm text-center bg-white border border-gray-300 rounded-sm p-5">Dont have an account?
                    <span className='text-signUpColor text-bold font-medium'><NavLink to={ROUTES.SIGN_UP}> Sign Up</NavLink> </span>
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

export default Login
