/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../lib/firebaseConfig'

function GetImagesFromFirebaseStorage() {
    const [imageURL, setImageURL] = useState<string[]>([])

    // const { user } = UseAuthListener()
    const imageRef = ref(storage, 'images/')
    listAll(imageRef).then((response) => {
        response.items.forEach(item => {
            getDownloadURL(item).then(url => {
                const tempURL = [...imageURL, url]
                setImageURL(tempURL)
            })
        })
    })

    console.log('images', imageURL)
    return (
        imageURL
    )
}

export default GetImagesFromFirebaseStorage
