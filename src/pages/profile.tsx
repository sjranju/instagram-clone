import React from 'react'
import { MdSettings } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/use-state-dispatch'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Profile = () => {
    const currentUser = useAppSelector(state => state.allUsers.currentUser)
    const { user } = useParams()
    console.log('Profile', currentUser)
    return (
        <div className='flex flex-col'>
            <div className="flex flex-row">
                <div className="">
                    <img src={currentUser?.imageURL} alt="" className='h-24 w-24' />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="text-md">{currentUser?.username}</div>
                        <button type='button' className='bg-white text-black'>Edit Profile</button>
                        <MdSettings />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
