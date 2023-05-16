/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/use-state-dispatch'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../lib/firebaseConfig'
import { updateAllUsers } from '../../features/updateUsers'
import FadeLoader from 'react-spinners/FadeLoader'

type unFollowType = {
    user: string
    url: string
}

function Suggestions() {
    const [errorMessage, setErrorMessage] = useState('')
    const [avatar, setAvatar] = useState<string[]>([])
    const [followingUser, setFollowingUser] = useState<string[]>([])
    const [clickedFollowing, setClickedFollowing] = useState<unFollowType[]>([])
    const suggestedUserState = useAppSelector(state => state.allUsers.suggestedUsers)
    const currentUserState = useAppSelector(state => state.allUsers.currentUser)
    const allUserState = useAppSelector(state => state.allUsers.users)
    const isLoading = useAppSelector(state => state.updateAllUsers.loading)
    const dispatch = useAppDispatch()

    const imagesRef = ref(storage, 'avatars/')

    useEffect(() => {
        if (suggestedUserState !== undefined) {
            listAll(imagesRef).then(response => {
                response.items.filter(item => {
                    getDownloadURL(item).then(url => {
                        setAvatar(prev => [...prev, url])
                    })
                })
            })
        }
    }, [])

    const handleFollow = (suggestedUser: string) => {
        const suggestedUserDetails = allUserState?.filter(user => user.username == suggestedUser)
        const userId = suggestedUserDetails?.find(user => (user.userId))

        dispatch(updateAllUsers({ currentUserId: currentUserState?.userId!, suggestedUserId: userId?.userId!, operation: 'add' }))
            .then(() => {
                // setFollowingUser(user.meta.arg.suggestedUserId)
                setFollowingUser([...followingUser, suggestedUser])
            })
            .catch(error => setErrorMessage(error))
    }

    const handleUnFollow = (userName: string) => {
        const suggestedUserDetails = allUserState?.filter(user => user.username == userName)
        const userId = suggestedUserDetails?.find(user => (user.userId))

        dispatch(updateAllUsers({ currentUserId: currentUserState?.userId!, suggestedUserId: userId?.userId!, operation: 'remove' }))
            .then(() => {
                setFollowingUser(followingUser.filter(user => user !== userName))
                setClickedFollowing(clickedFollowing.filter(user => user.user !== userName))
            })
            .catch(error => setErrorMessage(error))
    }

    return (
        <div className="">

            <div className="flex flex-col justify-center text-white text-sm">

                <div className="flex flex-row justify-between font-semibold mb-4">
                    <p className="text-activeBorderForInput">Suggestions for you</p>
                    <p className='text-xs flex justify-center items-center'>See all</p>
                </div>
                {
                    suggestedUserState !== undefined ?
                        suggestedUserState.map((suggestedUser, index) =>
                            <div className="flex flex-row items-center justify-between mb-4" key={index}>
                                <div className="flex flex-row space-x-4 justify-center items-center">
                                    <div className="">
                                        <img src={avatar.find(url => url.includes(suggestedUser.suggestedUser))} alt="profile picture" className='w-10 h-10 rounded-full' />
                                    </div>
                                    <div className="">
                                        <p className='font-semibold'>{suggestedUser.suggestedUser}</p>
                                        <div className="flex flex-row text-xs">followed by&nbsp;
                                            {suggestedUser.mutualFriend.map((user, ind) =>
                                                <div key={ind} className='flex flex-row'>
                                                    {
                                                        ind < 1 ?
                                                            suggestedUser.mutualFriend.length == 1 ?
                                                                user
                                                                : <p>{user}&#44;&nbsp;</p>
                                                            : ind == 1 ?
                                                                user
                                                                : <p>
                                                                    &nbsp;+&nbsp;{suggestedUser.mutualFriend.length - ind} more
                                                                </p>
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex text-xs">

                                    {isLoading ?
                                        <FadeLoader color='white' height={5} width={1} />
                                        : followingUser.includes(suggestedUser.suggestedUser) ?
                                            <div className='text-white font-medium'><button type='button' className='p-0 m-0' onClick={() => setClickedFollowing([...clickedFollowing, { user: suggestedUser.suggestedUser, url: avatar.find(url => url.includes(suggestedUser.suggestedUser))! }])} >Following</button></div>
                                            :
                                            <div className=' text-signUpColor'><button type='button' className='p-0 m-0' onClick={() => handleFollow(suggestedUser.suggestedUser)}>Follow</button></div>

                                    }
                                    {
                                        errorMessage ? errorMessage : ''
                                    }
                                    {clickedFollowing.map(usr =>
                                        usr.user == suggestedUser.suggestedUser ?
                                            <div key={usr.user} className="absolute top-60 bg-seperator rounded-lg text-sm w-1/5 h-fit ">
                                                <div className="flex flex-col text-white divide-y divide-slate-700 divide-solid justify-center">
                                                    <div className="flex flex-col justify-center items-center space-y-2 pt-8 pb-4">
                                                        <div className=""><img src={usr.url} className='w-16 h-16 rounded-full' /></div>
                                                        <div className="text-xs">Unfollow <span className=''>@{usr.user}</span></div>
                                                    </div>
                                                    <div className="flex justify-center items-center py-2"><button className='text-red-600 font-medium ' onClick={() => handleUnFollow(usr.user)}>Unfollow</button></div>
                                                    <div className="flex justify-center items-center py-2"><button type='button' onClick={() => setClickedFollowing(clickedFollowing.filter(user => user.user !== suggestedUser.suggestedUser))}>Cancel</button></div>
                                                </div>
                                            </div>
                                            : '')
                                    }
                                </div>

                            </div>
                        )
                        : ''
                }
            </div>
        </div>
    )
}

export default Suggestions
