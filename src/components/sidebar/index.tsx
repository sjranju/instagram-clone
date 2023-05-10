/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from 'react'
import { useAppSelector } from '../../store/use-state-dispatch'
// import UseAuthListener from '../../hooks/use-auth-listener'
// import { fetchUser } from '../../features/userSlice'
import User from './user'
// import { fetchUsers } from '../../features/allUsersSlice'
import Suggestions from './suggestions'
// import useSuggestions from '../../hooks/use-suggestions'
// import Skeleton from 'react-loading-skeleton'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Sidebar() {
    // const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.user.currentUser)
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
