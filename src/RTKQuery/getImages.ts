import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getDownloadURL, listAll, ref, StorageReference } from 'firebase/storage'
import { storage } from '../lib/firebaseConfig'

export const api = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['GetImages'],
    endpoints: (build) => ({
        getImages: build.query<string[], StorageReference>({
            async queryFn(refPath,) {
                try {
                    const imageList = await listAll(ref(storage, `${refPath}`))
                    const imagePromises = await Promise.all(imageList.items.map(item => getDownloadURL(item)))
                    return { data: imagePromises }
                }
                catch (error) {
                    return { error: error }
                }

            }
        }),

    })
})

export const { useGetImagesQuery } = api