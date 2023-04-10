/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, where, query, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'
import { ActiveUserType } from '../hooks/use-user'
// import { ActiveUserType } from '../hooks/use-suggestions'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export async function doesUserNameExist(userName: string, emailAddress: string) {
    // const usersCollectionRef = collection(db, 'users')
    // const result = await usersCollectionRef.where('userName', '==', userName).get()

    const queryUsers = query(collection(db, 'users'), where('username', '==', userName), where('emailAddress', '==', emailAddress))
    // return (await getDocs(queryUsers)).docs.map(user => user.data.length > 0)
    return (await getDocs(queryUsers)).docs.map(user => user.get('username'))

    // return result
    // return result.docs.map(user => user.data().length > 0)
}

export async function getUserDetailsByUserId(userId: string): Promise<ActiveUserType |undefined> {
    // const result = query(collection(db, 'users'), where('userId', '==', userId))
    const result = await getDoc(doc(db,'users',userId))
    // const result = query(collection(db, `users/${userId}`))
    console.log({result});
    if (result.exists()){
        return result.data()
    }
    return undefined
    // eslint-disable-next-line array-callback-return
    // return (await getDocs(result)).docs.map(item => ({ ...item.data() }))
}

export async function getAllUsers(): Promise<ActiveUserType[]> {
    const result = query(collection(db, 'users'))

    // eslint-disable-next-line array-callback-return
    return (await getDocs(result)).docs.map(item => ({ ...item.data() }))
}


export async function getSuggestionDetails(userIds: string[]) {
    const result = query(collection(db, 'users'), where('userId', 'not-in', userIds))
    // console.log('getSuggestionDetails', result)
    // eslint-disable-next-line array-callback-return
    return (await getDocs(result)).docs.map(item => ({ ...item.data() }))
}

// export async function getTimeLineDetials(userId: string) {
//   const result = query(collection(db, 'photos'), where('userId', '!=', userId))
//   return (await getDocs(result)).docs.map(item => ({ ...item.data() }))
// }
