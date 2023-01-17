/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, where, query, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export async function doesUserNameExist(userName: any) {
  // const usersCollectionRef = collection(db, 'users')
  // const result = await usersCollectionRef.where('userName', '==', userName).get()

  const queryUsers = query(collection(db, 'users'), where('userName', '==', userName))
  return (await getDocs(queryUsers)).docs.map(user => user.data.length > 0)
  // return result
  // return result.docs.map(user => user.data().length > 0)
}
