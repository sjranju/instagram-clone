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
        <div className=" bg-black ">
            <div className="flex items-center justify-evenly h-screen w-screen">
                <div className='flex flex-col justify-evenly items-center'>
                    <div className="flex flex-row justify-evenly items-center space-x-20">
                        <div className=" ">
                            <img src={currentUser?.imageURL} alt="" className='h-40 w-40 rounded-full' />
                        </div>
                        <div className="flex flex-col justify-evenly space-y-4">
                            <div className="flex flex-row items-center justify-evenly space-x-4">
                                <div className="text-xl text-white">{username}</div>
                                <button type='button' className='bg-white text-black py-2 px-3 rounded-lg text-sm font-semibold'>Edit Profile</button>
                                <MdSettings color='white' size={30} />
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
