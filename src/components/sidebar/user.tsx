/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/use-state-dispatch'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../lib/firebaseConfig'

function User() {
    const userState = useAppSelector(state => state.allUsers.currentUser)
    const [imageURL, setImageURL] = useState<string>('')
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
                <Link to={`/p/${userState?.username}`} className='flex flex-row items-center justify-between gap-20 text-white mb-4'>
                    <div className='flex flex-row space-x-4'>
                        <img src={imageURL} alt="profile picture" className=' h-14 w-14 rounded-full' />

                        <div className="flex flex-col justify-center">
                            <p className="text-sm font-bold">{userState?.username}</p>
                            <p className="text-sm">{userState?.fullName}</p>
                        </div>

                    </div>
                    <div className="text-xs text-signUpColor">
                        <button type='button'>Switch</button>
                    </div>
                </Link>
            }

        </div >
    )
}

export default User
