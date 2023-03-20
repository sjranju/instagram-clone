/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Link } from 'react-router-dom'
// import * as ROUTES from '../../constants/routes'

interface userPropType {
    fullName: string
    username: string
}

function User({ fullName, username }: userPropType) {

    return (
        <Link to={`/ p / ${username}`} className='flex flex-row items-center justify-between gap-20 text-white mb-4'>
            <div className='flex flex-row space-x-4'>
                <img src={`/images/avatars/${username ?? ''}.jpg`} alt="profile picture" className=' h-14 w-14 rounded-full' />
                <div className="flex flex-col justify-center">
                    <p className="text-sm font-bold">{username}</p>
                    <p className="text-sm">{fullName}</p>
                </div>

            </div>
            <div className="text-xs text-signUpColor">
                <button type='button'>Switch</button>
            </div>
        </Link>

    )
}

export default User
