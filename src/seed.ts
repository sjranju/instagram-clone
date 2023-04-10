/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable no-plusplus */

import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from './lib/firebaseConfig'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function seedDatabase () {
    const users = [
        {
            userId: 'glQAIOdmnuTeEWTrUMRdtanpWcE2',
            username: 'sjranju',
            fullName: 'Ranjana Singanoodi',
            emailAddress: 'sjranju@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            username: 'raphael',
            fullName: 'Raffaello Sanzio da Urbino',
            emailAddress: 'raphael@sanzio.com',
            following: [],
            followers: ['glQAIOdmnuTeEWTrUMRdtanpWcE2'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            username: 'dali',
            fullName: 'Salvador Dalí',
            emailAddress: 'salvador@dali.com',
            following: [],
            followers: ['glQAIOdmnuTeEWTrUMRdtanpWcE2'],
            dateCreated: Date.now()
        },
        {
            userId: '4',
            username: 'orwell',
            fullName: 'George Orwell',
            emailAddress: 'george@orwell.com',
            following: [],
            followers: ['glQAIOdmnuTeEWTrUMRdtanpWcE2'],
            dateCreated: Date.now()
        }
    ]

    // const usersCollectionRef = collection(db, 'users')
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
        // addDoc(usersCollectionRef, users[k])
        setDoc(doc(db,'users',users[k].userId),users[k])
        setDoc(doc(db,'photos',users[k].userId),{
            photoId: users[k].userId,
            userId: users[k].userId,
            imageSrc: `./public/images/${users[k].userId}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
                {
                    displayName: 'dali',
                    comment: 'Love this place, looks like my animal farm!'
                },
                {
                    displayName: 'orwell',
                    comment: 'Would you mind if I used this picture?'
                }
            ],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        })
    }
    // const photosCollectionRef = collection(db, 'photos')

    // eslint-disable-next-line prefer-const
    // for (let i = 1; i <= 5; ++i) {
    //     setDoc(doc(db,'photos',i),{
    //         photoId: i,
    //         userId: i,
    //         imageSrc: `./public/images/${i}.jpg`,
    //         caption: 'Saint George and the Dragon',
    //         likes: [],
    //         comments: [
    //             {
    //                 displayName: 'dali',
    //                 comment: 'Love this place, looks like my animal farm!'
    //             },
    //             {
    //                 displayName: 'orwell',
    //                 comment: 'Would you mind if I used this picture?'
    //             }
    //         ],
    //         userLatitude: '40.7128°',
    //         userLongitude: '74.0060°',
    //         dateCreated: Date.now()
    //     })
    //     // addDoc(photosCollectionRef, {
    //     //     photoId: i,
    //     //     userId: '2',
    //     //     imageSrc: `./public/images/${i}.jpg`,
    //     //     caption: 'Saint George and the Dragon',
    //     //     likes: [],
    //     //     comments: [
    //     //         {
    //     //             displayName: 'dali',
    //     //             comment: 'Love this place, looks like my animal farm!'
    //     //         },
    //     //         {
    //     //             displayName: 'orwell',
    //     //             comment: 'Would you mind if I used this picture?'
    //     //         }
    //     //     ],
    //     //     userLatitude: '40.7128°',
    //     //     userLongitude: '74.0060°',
    //     //     dateCreated: Date.now()
    //     // })
    // }
}