/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react'
import { AiFillFacebook, AiOutlineCopyright } from 'react-icons/ai'
import { SlArrowDown } from 'react-icons/sl'
import { NavLink, useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { doesUserNameExist } from '../services/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
// import { FirebaseContext } from '../context/firebase'
import { auth, db } from '../lib/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SignUp = () => {
    const [emailAddress, setEmailAddress] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()
    const isInvalid = userName === '' || password === '' || fullName === '' || emailAddress === ''

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userNameExists = await doesUserNameExist(userName)
        console.log('userNameExists', userNameExists)

        if (userNameExists.length === 0) {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, emailAddress, password)
                await updateProfile(user, { displayName: userName })
                const usersCollectionRef = collection(db, 'users')

                await addDoc(usersCollectionRef, {
                    userId: user.uid,
                    userName: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                })
                navigate(ROUTES.DASHBOARD)
            } catch (error: any) {
                // console.log(error);
                setEmailAddress('')
                setUserName('')
                setFullName('')
                setPassword('')
                setErrorMessage(error.message)
            }
        } else {
            setUserName('')
            setErrorMessage('That user name is already taken, please try another')
        }
    }

    useEffect(() => {
        document.title = 'Sign Up . Instagram'
    }, [])

    return (
        <div className='container flex flex-col justify-center items-center mt-3 mx-auto'>
            <div className="loginContainer max-w-sm flex flex-col space-y-2 text-center">
                <div className='flex flex-col space-y-3 text-center bg-white border border-inputBorder rounded-sm p-10'>
                    <img src='/images/logo.png' className='h-12 w-42 m-auto' />
                    <div className="text-signUpComments font-semibold text-md">Sign up to see photos and videos from your friends.</div>
                    <div className="flex justify-center">
                        <button className="flex font-semibold text-white w-full bg-signUpColor py-2 px-3 border rounded-lg text-sm justify-center align-center ">
                            <span className='mr-2'><AiFillFacebook className='h-5 w-5' /></span>
                            Log in with Facebook
                        </button>
                    </div>
                    <div className="relative flex py-2 items-center opacity-100">
                        <div className="flex-grow border-t-2 border-inputBorder"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold text-activeBorderForInput ">OR</span>
                        <div className="flex-grow border-t-2 border-inputBorder"></div>
                    </div>

                    <div className=''>
                        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/promise-function-async */}
                        <form onSubmit={(e) => handleSignUp(e)}>
                            <input
                                aria-label='Email address'
                                type="text"
                                placeholder="Email address"
                                value={emailAddress}
                                onChange={e => setEmailAddress(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder py-2 px-2 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your full Name'
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-2 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your username'
                                type="text"
                                placeholder="Username"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-2 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <input
                                aria-label='Enter your password'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='text-gray text-xs w-full rounded-sm border border-inputBorder mt-2 py-2 px-2 bg-mainPageBackground outline-none focus:border-activeBorderForInput' />
                            <div className="text-xs flex flex-col mt-4 space-y-2 w-full">
                                <div className="text-signUpComments">
                                    People who use our service may have uploaded your contact information to Instagram. <span className='text-black'><a href='#'>Learn more</a></span>
                                </div>
                                <div className="text-signUpComments">
                                    By signing up, you agree to our <span className='text-black'><a href='#'>Terms,</a></span><span className='text-black'><a href='#'> Privacy Policy</a></span> and <span className='text-black'><a href='#'> Cookies Policy.</a></span>
                                </div>
                            </div>
                            <button type="submit" className={`w-full rounded-md py-1 mt-4 text-white font-semibold text-sm ${isInvalid ? 'bg-blueDisabledButton' : 'bg-signUpColor'}`}>Sign Up</button>
                        </form>
                        {errorMessage}
                    </div>
                </div>
                <div className="text-sm text-center bg-white border border-gray-300 rounded-sm p-5">Have an account?
                    <NavLink to={ROUTES.LOGIN} className='text-signUpColor '> Log in</NavLink>
                </div>
                <div className="space-y-6 ">
                    <div className="text-sm mt-2">
                        Get the app.
                    </div>
                    <div className="flex flex-row space-x-3 justify-center">
                        <img src='/images/mainPage/gplay.png' alt='google play' className='h-10' />
                        <img src='/images/mainPage/ms.png' alt='microsoft' className='h-10 ' />
                    </div>
                </div>
            </div>
            <div className="flex flex-col text-xs mt-16 mb-16 text-signUpComments space-y-4">
                <div className="flex flex-row space-x-4 ">
                    <a href="" className="hover:underline">Meta</a>
                    <a href="" className="hover:underline">About</a>
                    <a href="" className="hover:underline">Blog</a>
                    <a href="" className="">Jobs</a>
                    <a href="" className="hover:underline">Help</a>
                    <a href="" className="hover:underline">API</a>
                    <a href="" className="">Privacy</a>
                    <a href="" className="">Terms</a>
                    <a href="" className="">Top accounts</a>
                    <a href="" className="">Locations</a>
                    <a href="" className="">Instagram Lite</a>
                    <a href="" className="">Contact uploading and non-users</a>
                    <a href="" className="hover:underline">Meta Verified</a>
                </div>
                <div className="relative flex flex-row justify-center items-center space-x-4">
                    <div className="block">
                        <span className='inline-block relative cursor-pointer'>
                            <div className="flex flex-row justify-center items-center">
                                <span>English (UK)</span>
                                <div className="flex flex-col relative justify-start ml-2 ">
                                    <span className='inline-block'><SlArrowDown className='block relative' /></span>
                                </div>
                            </div>
                            <select aria-label="Switch display language" className='cursor-pointer absolute top-0 left-0 h-full opacity-0 w-full'>
                                <option value="af">Afrikaans</option>
                                <option value="cs">Čeština</option>
                                <option value="da">Dansk</option>
                                <option value="de">Deutsch</option>
                                <option value="el">Ελληνικά</option>
                                <option value="en">English</option>
                                <option value="en-gb">English (UK)</option>
                                <option value="es">Español (España)</option>
                                <option value="es-la">Español</option>
                                <option value="fi">Suomi</option>
                                <option value="fr">Français</option>
                                <option value="id">Bahasa Indonesia</option>
                                <option value="it">Italiano</option>
                                <option value="ja">日本語</option>
                                <option value="ko">한국어</option>
                                <option value="ms">Bahasa Melayu</option>
                                <option value="nb">Norsk</option>
                                <option value="nl">Nederlands</option>
                                <option value="pl">Polski</option>
                                <option value="pt-br">Português (Brasil)</option>
                                <option value="pt">Português (Portugal)</option>
                                <option value="ru">Русский</option>
                                <option value="sv">Svenska</option>
                                <option value="th">ภาษาไทย</option>
                                <option value="tl">Filipino</option>
                                <option value="tr">Türkçe</option>
                                <option value="zh-cn">中文(简体)</option>
                                <option value="zh-tw">中文(台灣)</option>
                                <option value="bn">বাংলা</option>
                                <option value="gu">ગુજરાતી</option>
                                <option value="hi">हिन्दी</option>
                                <option value="hr">Hrvatski</option>
                                <option value="hu">Magyar</option>
                                <option value="kn">ಕನ್ನಡ</option>
                                <option value="ml">മലയാളം</option>
                                <option value="mr">मराठी</option>
                                <option value="ne">नेपाली</option>
                                <option value="pa">ਪੰਜਾਬੀ</option>
                                <option value="si">සිංහල</option>
                                <option value="sk">Slovenčina</option>
                                <option value="ta">தமிழ்</option>
                                <option value="te">తెలుగు</option>
                                <option value="vi">Tiếng Việt</option>
                                <option value="zh-hk">中文(香港)</option>
                                <option value="bg">Български</option>
                                <option value="fr-ca">Français (Canada)</option>
                                <option value="ro">Română</option>
                                <option value="sr">Српски</option>
                                <option value="uk">Українська</option>
                            </select>
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <div className="px-1 flex justify-center items-center"><AiOutlineCopyright /> </div>
                        <div className="">2023 Instagram from Meta</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
