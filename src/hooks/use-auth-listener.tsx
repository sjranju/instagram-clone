/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/indent */
import { useContext, useEffect } from 'react'
import { FirebaseContext } from '../context/firebase'
import { auth } from '../lib/firebaseConfig'
import { UserContext } from '../context/user'

function UseAuthListener() {
    const { user, setUser } = useContext(UserContext)
    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        const listener = auth.onAuthStateChanged((authUser) => {
            if (authUser != null) {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            } else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
        return () => listener()
    }, [firebase])

    return ({ user })
}

export default UseAuthListener
