import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import { seedDatabase } from '../seed'
import { getAuth } from 'firebase/auth'
// import { seedDatabase } from '../seed'

const config = {
    apiKey: 'AIzaSyA-ucnCKa7An-EXuaWER-WscJPdUaY5epI',
    authDomain: 'instagram-clone-7626f.firebaseapp.com',
    projectId: 'instagram-clone-7626f',
    storageBucket: 'instagram-clone-7626f.appspot.com',
    messagingSenderId: '155184726930',
    appId: '1:155184726930:web:e19156e6c508a266a8f74b'
}

export const app = initializeApp(config)
export const db = getFirestore(app)
export const auth = getAuth(app)

// seedDatabase()
