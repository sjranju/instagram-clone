/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/use-state-dispatch'
import { setImageURL } from '../features/updateImageURLs'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../lib/firebaseConfig'
import { TbDots } from 'react-icons/tb'
import { setPostURL, updateLikes } from '../features/updatePostURL'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FiBookmark, FiMessageCircle, FiSend } from 'react-icons/fi'
import { useGetImagesQuery } from '../RTKQuery/apiSlice'

function Timeline() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.userPosts.postData)
    const allUsers = useAppSelector(state => state.allUsers.users)
    const currentUser = useAppSelector(state => state.allUsers.currentUser)
    const { data, isSuccess } = useGetImagesQuery('avatars/')
    const { data: postData, isSuccess: isSuccessPostData } = useGetImagesQuery('posts/')

    useEffect(() => {
        currentUser?.following?.map(user => {
            const foundUser = allUsers?.find(usr => usr.userId == user)
            if (foundUser?.username !== undefined && foundUser?.imageURL === undefined && isSuccess) {
                dispatch(setImageURL({ user: `${foundUser?.username}`, url: `${data.find(url => url.includes(foundUser.username!))}` }))
            }
        })
    }, [currentUser])

    useEffect(() => {
        posts?.map(post => {
            if (post.imageSrc === undefined && isSuccessPostData && post.photoId !== undefined) {
                console.log('post dats in timeline', postData)
                dispatch(setPostURL({ userId: `${post?.userId}`, url: `${postData.find(url => url.includes(`${post.photoId + ('.jpg' || '.png')}`))}` }))
            }
        })
    }, [posts])
    console.log('posts', posts)

    return (
        <div className='flex items-center justify-center text-white max-w-md w-full bg-black overflow-y-hidden'>
            <div className="">
                <div className="flex flex-col space-y-8 justify-center">
                    {
                        posts?.map(post =>
                            <div key={post.userId} className="text-white text-md">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row space-x-4 grow">
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

                                        <div className="">
                                            <TbDots />
                                        </div>
                                    </div>
                                    <div className=" ">
                                        <div className="overflow-hidden border-x border-y border-postSeperator" onDoubleClick={() => { post.userId ? dispatch(updateLikes(post.userId)) : '' }}>
                                            <img src={post.imageSrc} alt="" className='h-full w-full object-cover rounded-sm '
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                                            />
                                        </div>
                                        <div className="flex flex-row justify-between mt-2">
                                            <div className="flex flex-row space-x-2">
                                                {
                                                    post.likes?.includes(currentUser?.userId!) ?
                                                        <AiFillHeart size={28} style={{ fill: 'red' }} onClick={() => { post.userId ? dispatch(updateLikes(post.userId)) : '' }} />
                                                        : < AiOutlineHeart size={28} onClick={() => { post.userId ? dispatch(updateLikes(post.userId)) : '' }} />
                                                }
                                                <FiMessageCircle size={26} />
                                                <FiSend size={24} />
                                            </div>
                                            <FiBookmark size={26} />
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <span className='font-semibold'>{allUsers?.find(user => user.userId === post.userId)?.username}</span>
                                        &nbsp;
                                        {post.caption}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Timeline
