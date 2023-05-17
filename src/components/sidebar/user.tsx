/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/use-state-dispatch'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../lib/firebaseConfig'
import { CgClose } from 'react-icons/cg'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import * as ROUTES from '../../constants/routes'

function User() {
    const userState = useAppSelector(state => state.allUsers.currentUser)
    const [imageURL, setImageURL] = useState<string>('')
    const [switchProfile, setSwitchProfile] = useState<boolean>(false)
    const avatarImageRef = ref(storage, 'avatars/')
    useEffect(() => {
        if (userState?.username !== undefined) {
            listAll(avatarImageRef).then((response) => {
                response.items.filter(item => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    if (item.name.includes(userState.username!)) {
                        getDownloadURL(item).then(url => setImageURL(url)
                        )
                    }

                })
            })
        }
    }, [])

    return (
        <div>
            {
                <div className="flex flex-row items-center justify-between gap-20 text-white mb-4">
                    <Link to={`/p/${userState?.username}`} className=''>
                        <div className='flex flex-row space-x-4'>
                            <img src={imageURL} alt="profile picture" className=' h-14 w-14 rounded-full' />

                            <div className="flex flex-col justify-center">
                                <p className="text-sm font-bold">{userState?.username}</p>
                                <p className="text-sm">{userState?.fullName}</p>
                            </div>
                        </div>
                    </Link>

                    <div className="text-xs text-signUpColor">
                        <button type='button' onClick={() => setSwitchProfile(true)}>Switch</button>
                    </div>
                </div>
            }
            {
                switchProfile ?

                    <div className="absolute flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center h-fit w-full max-w-sm rounded-md bg-seperator">
                        <div className="relative w-full">
                            <div className="flex flex-col divide-y divide-slate-700 divide-solid">
                                <div className=" flex flex-row items-center h-full w-full py-2">
                                    <div className=" inline-block text-white font-semibold w-full text-center grow-1"><h1>Switch accounts</h1></div>
                                    <div className="relative flex flex-col h-full justify-center items-center basis-11 float-right">
                                        <button className="relative pr-4 flex flex-col shrink-0 justify-start grow-0" onClick={() => setSwitchProfile(false)}>
                                            <CgClose color='white' size={24} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between text-white px-4">
                                    <div className="mt-2">
                                        <Link to={`/p/${userState?.username}`} className=''>
                                            <div className='flex flex-row space-x-4'>
                                                <img src={imageURL} alt="profile picture" className=' h-12 w-12 rounded-full' />

                                                <div className="flex flex-col justify-center">
                                                    <p className="text-sm font-bold">{userState?.username}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-xs">
                                        <RiCheckboxCircleFill size={28} color='#0095F6' />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between mb-28"></div>
                            <Link to={ROUTES.LOGIN} className="flex text-signUpColor text-sm font-medium justify-center items-center pb-4">
                                <div>Log In to an Existing Account</div>
                            </Link>
                        </div>
                    </div>
                    :
                    ''


            }

        </div >
    )
}

export default User
