/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/use-state-dispatch'
import { setImageURL } from '../features/updateImageURLs'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../lib/firebaseConfig'
import { TbDots } from 'react-icons/tb'

function Timeline() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.userPosts.currentlyFollowingUserPost)
    const allUsers = useAppSelector(state => state.allUsers.users)
    const currentUser = useAppSelector(state => state.allUsers.currentUser)

    useEffect(() => {
        currentUser?.following?.map(user => {
            const foundUser = allUsers?.find(usr => usr.userId == user)
            if (foundUser?.imageURL === undefined) {
                const imagesRef = ref(storage, `avatars/${foundUser?.username}.jpg`)
                getDownloadURL(imagesRef).then(url => {
                    dispatch(setImageURL({ user: `${foundUser?.username}`, url: url }))
                })
            }
        })
    }, [currentUser])

    return (
        <div className='text-white w-56 max-w-2xl'>
            <div className="">
                <div className="flex flex-col space-y-8 justify-center">
                    {
                        posts?.map(post =>
                            <div key={post.userId} className="text-white text-md">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row space-x-4">
                                        <div className="">
                                            <img src={allUsers?.find(user => user.userId === post.userId)?.imageURL} alt="" className='w-8 h-8 rounded-full' />
                                        </div>
                                        <div className="text-sm font-semibold">
                                            {
                                                allUsers ?
                                                    allUsers?.find(user => user.userId === post.userId)?.username
                                                    : ''
                                            }
                                        </div>
                                    </div>

                                    <div className="justify-self-end">
                                        <TbDots />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Timeline
