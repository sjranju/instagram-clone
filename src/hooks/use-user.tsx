/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useEffect, useState } from 'react'
import UseAuthListener from './use-auth-listener'
import { getUserDetailsByUserId } from '../services/firebase'

interface ActiveUserType {
    dateCreated?: number
    emailAddress?: string
    followers?: string[]
    following?: string[]
    fullName?: string
    userId?: string
    username?: string
}

function useUser() {
    const { user } = UseAuthListener()
    const [activeUser, setActiveUser] = useState<ActiveUserType>({
        dateCreated: 0,
        emailAddress: '',
        followers: [],
        following: [],
        fullName: '',
        userId: '',
        username: ''
    })

    useEffect(() => {
        async function getUserObjByUserId() {
            if (user != null) {
                const [response] = await getUserDetailsByUserId(user?.uid)
                setActiveUser(response)
                // console.log('response', response)
            }
        }
        if ((user?.uid) != null) {
            void getUserObjByUserId()
        }
    }, [user])

    return ({ user: activeUser })
}

export default useUser
