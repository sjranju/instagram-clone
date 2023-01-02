/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable no-plusplus */

import { collection, addDoc } from 'firebase/firestore'
import { db } from './lib/firebaseConfig'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function seedDatabase () {
  const users = [
    {
      userId: 'f6DV0xK99aWZ3B87z8BenOa4lv63',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
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
      followers: ['f6DV0xK99aWZ3B87z8BenOa4lv63'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['f6DV0xK99aWZ3B87z8BenOa4lv63'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['f6DV0xK99aWZ3B87z8BenOa4lv63'],
      dateCreated: Date.now()
    }
  ]

  const usersCollectionRef = collection(db, 'users')
  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    void addDoc(usersCollectionRef, users[k])
  }
  const photosCollectionRef = collection(db, 'photos')

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    void addDoc(photosCollectionRef, {
      photoId: i,
      userId: '2',
      imageSrc: `./public/images/${i}.jpg`,
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
}