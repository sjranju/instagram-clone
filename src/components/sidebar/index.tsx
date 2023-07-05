/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from 'react'
import { useAppSelector } from '../../store/use-state-dispatch'
import User from './user'
import Suggestions from './suggestions'
// import Skeleton from 'react-loading-skeleton'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Sidebar() {
    const userState = useAppSelector(state => state.allUsers.currentUser)
    const suggestedUserState = useAppSelector(state => state.allUsers.users)

    return (
        <>
            {userState?.username ?
                <>
                    <User />
                    {suggestedUserState !== undefined ? <Suggestions /> : ''}
                </>
                : ''
            }
        </>
    )
}

export default Sidebar
