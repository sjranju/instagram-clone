/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { auth, storage } from '../lib/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AiOutlineCopyright } from 'react-icons/ai'
import { SlArrowDown } from 'react-icons/sl'
import { useGetImagesQuery } from '../RTKQuery/apiSlice'
import { ref } from 'firebase/storage'
import ImageCarouselSkeleton from '../ShimmerUI/ImageCarouselSkeleton'
import LogoSkeleton from '../ShimmerUI/LogoSkeleton'
import DownloadAppSkeleton from '../ShimmerUI/DownloadAppSkeleton'
import Skeleton from 'react-loading-skeleton'

const Login = () => {
    const [emailAddress, setEmailAddress] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [imageCounter, setImageCounter] = useState<number>(0)
    const navigate = useNavigate()
    const isInvalid = emailAddress === '' || password === ''
    const loginPageImageRef = ref(storage, 'login/')
    const { data, isLoading } = useGetImagesQuery(loginPageImageRef)

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        void signInWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredential) => {
                navigate(ROUTES.DASHBOARD)
                console.log(userCredential, 'userCredential')
            })
            .catch(error => {
                setError(error.message)
                setEmailAddress('')
                setPassword('')
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // eslint-disable-next-line array-callback-return, @typescript-eslint/no-unused-vars
            if (imageCounter === 2) {
                setImageCounter(0)
            } else { setImageCounter(imageCounter + 1) }
        }, 3600)
        return () => {
            clearInterval(interval)
        }
    }, [imageCounter])

    return (
        <div className='flex flex-col items-center justify-center' role={'login'}>
            <section className='min-h-screen flex flex-col grow-1 overflow-x-hidden overflow-y-auto'>
                <main className="relative flex flex-col">
                    <article className='flex mt-8 justify-center mx-auto grow shrink-0 box-border pb-8 w-full'>
                        {isLoading ?
                            <ImageCarouselSkeleton />
                            :
                            <div className={`hidden md:flex h-[581px] basis-96 mb-3 mr-8`} style={{ backgroundImage: `url(${data?.find((img) => img.includes('backgroundImg'))})`, backgroundSize: '468.32px 634.15px', backgroundPosition: '-46px 0px' }}>
                                <div className="relative flex flex-col box-border align-baseline p-0 mt-[27px] ml-28">
                                    {
                                        data?.filter(img => img.includes('img')).map((imageUrl, i) =>
                                            <img key={i} src={imageUrl} className={`absolute inset-0 m-0 w-[250px] h-[539px] ${imageCounter === i ? 'visible' : 'hidden'}`} />
                                        )
                                    }

                                </div >
                            </div>
                        }
                        <div className="flex flex-col space-y-2 text-center justify-center items-center align-center">
                            <div className='flex flex-col space-y-10 text-center bg-white border border-inputBorder rounded-sm p-10 max-w-sm'>
                                {isLoading ?
                                    <LogoSkeleton />
                                    : <img src={data?.find(img => img.includes('logo'))} className='h-12 w-42 m-auto' alt='Instagram logo' />
                                }
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
                                        {
                                            isLoading ?
                                                <Skeleton width={20} height={20} className='text-center mx-auto flex justify-center items-center mr-2' />
                                                : <img src={data?.find(img => img.includes('facebook'))} className='inline-block relative h-4 w-4 mr-3 top-0.5 text-center' alt='facebook icon'></img>
                                        }
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
                                    {
                                        isLoading ?
                                            <DownloadAppSkeleton />
                                            :
                                            <>
                                                <img src={data?.find(img => img.includes('gplay'))} alt='google play' className='h-10 ' />
                                                <img src={data?.find(img => img.includes('ms'))} alt='microsoft' className='h-10 ' />
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </article>
                </main >

                <footer className="flex flex-col text-xs text-signUpComments justify-center px-4">
                    <div className="flex flex-col mt-8 mb-12 ">
                        <div className="flex flex-row flex-wrap justify-center">
                            <a href="" className="hover:underline mb-3 justify-start mx-2">Meta</a>
                            <a href="" className="hover:underline mb-3 justify-start mx-2">About</a>
                            <a href="" className="hover:underline mb-3 justify-start mx-2">Blog</a>
                            <a href="" className=" mb-3 justify-start mx-2">Jobs</a>
                            <a href="" className="hover:underline mb-3 justify-start mx-2">Help</a>
                            <a href="" className="hover:underline mb-3 justify-start mx-2">API</a>
                            <a href="" className="justify-start mb-3 mx-2">Privacy</a>
                            <a href="" className="justify-start mb-3 mx-2">Terms</a>
                            <a href="" className="justify-start mb-3 mx-2">Top accounts</a>
                            <a href="" className="justify-start mb-3 mx-2">Locations</a>
                            <a href="" className="justify-start mb-3 mx-2">Instagram Lite</a>
                            <a href="" className="justify-start mb-3 mx-2">Contact uploading and non-users</a>
                            <a href="" className="hover:underline mb-3 justify-start mx-2">Meta Verified</a>
                        </div>
                        <div className="relative flex flex-row justify-center items-center space-x-4 mt-2">
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
                </footer>
            </section>
        </div >
    )
}

export default Login
