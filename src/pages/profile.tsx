import React from 'react'
import { MdSettings } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/use-state-dispatch'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Profile = () => {
    const currentUser = useAppSelector(state => state.allUsers.currentUser)
    const posts = useAppSelector(state => state.userPosts.postData)
    const { username } = useParams()
    console.log('Profile', username)
    return (
        <div className=" bg-black text-textColor">
            <div className="flex items-center justify-evenly h-screen w-screen">
                <div className='flex flex-col justify-evenly items-center'>
                    <div className="flex flex-row justify-evenly items-center space-x-20">
                        <div className=" ">
                            <img src={currentUser?.imageURL} alt="" className='h-40 w-40 rounded-full' />
                        </div>
                        <div className="flex flex-col justify-evenly space-y-4">
                            <div className="flex flex-row items-center justify-center">
                                <div className="text-xl text-white mr-2">{username}</div>
                                <div className="ml-4 flex items-center justify-center space-x-2 h-8">
                                    <button type='button' className='bg-zinc-700 py-2 px-3 text-center rounded-lg text-sm font-semibold'>Edit Profile</button>
                                    <button type='button' className='bg-zinc-700 py-2 px-3 text-center rounded-lg text-sm font-semibold'>View archive</button>
                                </div>
                                <MdSettings color='white' size={26} className="ml-3" />
                            </div>
                            <div className="text-white flex flex-row space-x-4">
                                <div className=""><span className='font-semibold mr-1'>1</span> post</div>
                                <div className=""><span className='font-semibold mr-1'>{currentUser?.followers?.length}</span>followers</div>
                                <div className=""><span className='font-semibold mr-1'>{currentUser?.following?.length}</span>following</div>
                            </div>
                            <div className="text-white text-sm font-semibold">
                                {currentUser?.fullName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
