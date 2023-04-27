import { storage } from '../lib/firebaseConfig'
import { listAll, ref } from 'firebase/storage'

const imageRef=ref(storage,'/images')
console.log(listAll(imageRef).then((response)=>response.items),'images')

