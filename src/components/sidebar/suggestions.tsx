/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/use-state-dispatch'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../lib/firebaseConfig'
import { mutualFriend } from '../../features/allUsersSlice'
// import UseAuthListener from '../../hooks/use-auth-listener'
// import { getDownloadURL, listAll, ref } from 'firebase/storage'
// import { storage } from '../../lib/firebaseConfig'

function Suggestions() {
    const suggestedUserState = useAppSelector(state => state.allUsers.suggestedUser)
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

    return (
        <div className="flex flex-col justify-center text-white text-sm">

            <div className="flex flex-row justify-between font-semibold mb-4">
                <p className="text-activeBorderForInput">Suggestions for you</p>
                <p className='text-xs flex justify-center items-center'>See all</p>
            </div>
            {
                suggestedUserState !== undefined ?
                    Array.from(suggestedUserState, ((suggestedUser, index) =>
                        suggestedUser.suggestedUser.map(user =>
                            <div className="flex flex-row items-center justify-between mb-4" key={index}>
                                <div className="flex flex-row space-x-4 justify-center items-center">
                                    <div className="">
                                        <img src={avatar.find(url => url.includes(user))} alt="profile picture" className='w-10 h-10 rounded-full' />
                                    </div>
                                    <div className="">
                                        <p className='font-semibold'>{user}</p>
                                        <div className="flex flex-row text-xs">followed by&nbsp;{suggestedUser.mutualFrnd.map((user, index) => <div key={index} className='flex flex-row'> {user}
                                            {suggestedUser.mutualFrnd.length > 1 ?
                                                index == suggestedUser.mutualFrnd.length - 1 ?
                                                    ""
                                                    : ', '
                                                : ''
                                            }
                                        </div>)}

                                            {suggestedUser.mutualFrnd.length == 2
                                                ? ''
                                                : <p>
                                                    &nbsp;+{suggestedUser.mutualFrnd.length - 1} more
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex text-xs text-signUpColor">
                                    <button type='button' className='p-0 m-0'>Follow</button>
                                </div>
                            </div>
                        )
                    )
                    )
                    : ''
            }
        </div>
    )
}

export default Suggestions
