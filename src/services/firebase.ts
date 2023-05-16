/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, where, query, getDocs, getDoc, doc} from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'
import { ActiveUserType } from '../hooks/use-user'
// import { ActiveUserType } from '../hooks/use-suggestions'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export async function doesUserNameExist(userName: string, emailAddress: string) {
    const queryUsers = query(collection(db, 'users'), where('username', '==', userName), where('emailAddress', '==', emailAddress))
    return (await getDocs(queryUsers)).docs.map(user => user.get('username'))
}

export async function getUserDetailsByUserName(userId: string){
    const result = await getDoc(doc(db,'users',userId))
    if (result.exists()){
        return result.data()
    }
    return undefined
}

export async function getAllUsers(): Promise<ActiveUserType[]> {
    const result = query(collection(db, 'users'))
    return (await getDocs(result)).docs.map(item => ({ ...item.data() }))
}


export async function getSuggestionDetails(userIds: string[]) {
    const result = query(collection(db, 'users'), where('userId', 'not-in', userIds))
    return (await getDocs(result)).docs.map(item => ({ ...item.data() }))
}

