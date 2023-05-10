/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/use-state-dispatch'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { db, storage } from '../../lib/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

function Suggestions() {
    const suggestedUserState = useAppSelector(state => state.allUsers.users)
    const currentUserState = useAppSelector(state => state.user.currentUser)
    console.log('suggestedUserState', suggestedUserState);

    const [avatar, setAvatar] = useState<string[]>([])
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
        const currentUserDocRef = doc(db, `users/${currentUserState}`)
        updateDoc(currentUserDocRef, { following: suggestedUser })
        const suggestedUserDocRef = doc(db, `users/${suggestedUser}`)
        updateDoc(suggestedUserDocRef, { followers: currentUserState?.userId })
    }

    return (
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
                            <div className="flex text-xs text-signUpColor">
                                <button type='button' className='p-0 m-0' onClick={() => handleFollow(suggestedUser.suggestedUser)}>Follow</button>
                            </div>
                        </div>
                    )
                    : ''
            }
        </div>
    )
}

export default Suggestions
