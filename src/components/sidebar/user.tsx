/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Link } from 'react-router-dom'
import UseAuthListener from '../../hooks/use-auth-listener'
// import * as ROUTES from '../../constants/routes'

interface userPropType {
    fullName: string
    username: string
}

function User({ fullName, username }: userPropType) {
    const { user } = UseAuthListener()
    return (
        <Link to={`/p/${username}`} className='flex flex-row items-center justify-between gap-4 text-white mb-4'>
            <div className='flex flex-row space-x-4'>
                <img src={`/images/avatars/${user?.displayName ?? ''}.jpg`} alt="profile picture" className=' h-16 w-16 rounded-full' />
                <div className="flex flex-col">
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
