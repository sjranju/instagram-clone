/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { auth } from '../lib/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AiOutlineCopyright } from 'react-icons/ai'
import { SlArrowDown } from 'react-icons/sl'

const Login = () => {
    const imageList = [
        '/images/mainPage/img1.png',
        '/images/mainPage/img2.png',
        '/images/mainPage/img3.png',
        '/images/mainPage/img4.png'
    ]

    const [emailAddress, setEmailAddress] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [imageCounter, setImageCounter] = useState<number>(0)
    const navigate = useNavigate()
    const isInvalid = emailAddress === '' || password === ''

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // try {
        void signInWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredential) => {
                navigate(ROUTES.DASHBOARD)
                console.log(userCredential, 'userCredential')
            })
            .catch(error => {
                setError(error.message)
                setEmailAddress('')
                setPassword('')
                // alert(error)
            })

        // }
        //          catch (error) {
        //     setEmailAddress('')
        //     setPassword('')
        //     console.log(error)
        // }
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
        <div className='container flex flex-col items-center justify-center mt-8 mx-auto'>
            <div className="flex flex-row max-w-screen-md">
                <div className='flex'>
                    <div className="backgroundimg top-0">
                        <img src='/images/mainPage/blackPhoneFrame5.png' className='phoneframe' />
                        {
                            <img src={imageList[imageCounter]} className='image1' />
                        }
                    </div>
                </div>
                <div className="flex flex-col space-y-2 text-center justify-center items-center align-center">
                    <div className='flex flex-col space-y-10 text-center bg-white border border-inputBorder rounded-sm p-10'>
                        <img src="/images/logo.png" className='h-12 w-42 m-auto' />
                        <div className=''>
                            <form onSubmit={handleLogin}>
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
                                <button type='submit' className={`w-full rounded-md py-1 mt-4 text-white ${isInvalid ? 'bg-blueDisabledButton' : 'bg-signUpColor'}`}>Log in</button>
                            </form>

                            <div className="relative flex py-5 items-center">
                                <div className="flex-grow border-t border-inputBorder"></div>
                                <span className="flex-shrink mx-4 text-xs font-semibold text-activeBorderForInput">OR</span>
                                <div className="flex-grow border-t border-inputBorder"></div>
                            </div>

                            <div className="flex flex-row justify-center mb-2">
                                <img src='/images/mainPage/facebook-icon.png' className='inline-block relative h-4 w-4 mr-3 top-0.5 text-center'></img>
                                <div className="text-center font-semibold text-darkBlue text-sm">Log in with Facebook</div>
                            </div>
                            {
                                <div className={`text-sm ${(error.length !== 0) ? 'text-errorMessage' : 'text-black'}`}>
                                    {error}
                                </div>
                            }
                            <div className="relative text-xs top-2">Forgotten your password?</div>
                        </div>
                    </div>
                    <div className="text-sm text-center bg-white border border-gray-300 rounded-sm p-5 w-full">Dont have an account?
                        <span className='text-signUpColor text-bold font-medium'><NavLink to={ROUTES.SIGN_UP}> Sign up</NavLink> </span>
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
                                <option value="cs">??e??tina</option>
                                <option value="da">Dansk</option>
                                <option value="de">Deutsch</option>
                                <option value="el">????????????????</option>
                                <option value="en">English</option>
                                <option defaultValue="en-gb">English (UK)</option>
                                <option value="es">Espa??ol (Espa??a)</option>
                                <option value="es-la">Espa??ol</option>
                                <option value="fi">Suomi</option>
                                <option value="fr">Fran??ais</option>
                                <option value="id">Bahasa Indonesia</option>
                                <option value="it">Italiano</option>
                                <option value="ja">?????????</option>
                                <option value="ko">?????????</option>
                                <option value="ms">Bahasa Melayu</option>
                                <option value="nb">Norsk</option>
                                <option value="nl">Nederlands</option>
                                <option value="pl">Polski</option>
                                <option value="pt-br">Portugu??s (Brasil)</option>
                                <option value="pt">Portugu??s (Portugal)</option>
                                <option value="ru">??????????????</option>
                                <option value="sv">Svenska</option>
                                <option value="th">?????????????????????</option>
                                <option value="tl">Filipino</option>
                                <option value="tr">T??rk??e</option>
                                <option value="zh-cn">??????(??????)</option>
                                <option value="zh-tw">??????(??????)</option>
                                <option value="bn">???????????????</option>
                                <option value="gu">?????????????????????</option>
                                <option value="hi">??????????????????</option>
                                <option value="hr">Hrvatski</option>
                                <option value="hu">Magyar</option>
                                <option value="kn">???????????????</option>
                                <option value="ml">??????????????????</option>
                                <option value="mr">???????????????</option>
                                <option value="ne">??????????????????</option>
                                <option value="pa">??????????????????</option>
                                <option value="si">???????????????</option>
                                <option value="sk">Sloven??ina</option>
                                <option value="ta">???????????????</option>
                                <option value="te">??????????????????</option>
                                <option value="vi">Ti???ng Vi???t</option>
                                <option value="zh-hk">??????(??????)</option>
                                <option value="bg">??????????????????</option>
                                <option value="fr-ca">Fran??ais (Canada)</option>
                                <option value="ro">Rom??n??</option>
                                <option value="sr">????????????</option>
                                <option value="uk">????????????????????</option>
                            </select>
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <div className="px-1 flex justify-center items-center"><AiOutlineCopyright /> </div>
                        <div className="">2023 Instagram from Meta</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login
