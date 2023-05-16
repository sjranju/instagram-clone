/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useEffect } from 'react'
import { fetchUser } from '../features/userSlice'
import { useAppDispatch, useAppSelector } from '../store/use-state-dispatch'
import UseAuthListener from './use-auth-listener'
// import { ActiveUserType } from './use-suggestions'

export interface ActiveUserType {
    dateCreated?: number
    emailAddress?: string
    followers?: string[]
    following?: string[]
    fullName?: string
    userId?: string
    username?: string
}

function useUser() {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.allUsers.currentUser)
    const { user } = UseAuthListener()

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchUser(user?.uid))
        }
    }, [])
    // useEffect(() => {
    //     async function getUserObjByUserId() {
    //         if (user != null) {
    //             const [response] = await getUserDetailsByUserId(user?.uid)
    //             setActiveUser(response)
    //             console.log('response', response)
    //         }
    //     }
    //     if ((user?.uid) != null) {
    //         void getUserObjByUserId()
    //     }
    // }, [user])
    // console.log('userState fetch', userState.user?.username);

    console.log('userState', userState);

    return ({ user: userState })
}

export default useUser


