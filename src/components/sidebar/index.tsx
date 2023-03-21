/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/use-state-dispatch'
import UseAuthListener from '../../hooks/use-auth-listener'
import { fetchUser } from '../../features/userSlice'
import User from './user'
import { fetchUsers } from '../../features/allUsersSlice'
// import Suggestions from './suggestions'
// import useSuggestions from '../../hooks/use-suggestions'
// import Skeleton from 'react-loading-skeleton'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Sidebar() {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.user.currentUser)
    const { user } = UseAuthListener()

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchUser(user?.uid))
            dispatch(fetchUsers())
        }
    }, [])

    // const { suggestions } = useSuggestions()
    // console.log('suggestions', suggestions)
    console.log('userState', userState);

    return (
        <User />
    )
}

export default Sidebar
