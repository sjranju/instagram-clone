/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/use-state-dispatch'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../lib/firebaseConfig'
// import * as ROUTES from '../../constants/routes'

// interface userPropType {
//     fullName: string
//     username: string
// }
// const [imageURL, setImageURL] = useState<string | null>('')

function User() {
    const userState = useAppSelector(state => state.allUsers.currentUser)
    const [imageURL, setImageURL] = useState<string>('')
    // console.log('userState', userState?.username)

    const avatarImageRef = ref(storage, 'avatars/')
    useEffect(() => {
        if (userState?.username !== undefined) {
            listAll(avatarImageRef).then((response) => {
                response.items.filter(item => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    if (item.name.includes(userState.username!)) {
                        getDownloadURL(item).then(url => setImageURL(url)
                        )
                    }

                })
            })
        }
    }, [])
    // console.log(imageURL, 'imageURL');

    // const { user } = UseAuthListener()
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if (user?.uid !== undefined) {
    //         dispatch(fetchUsers())
    //     }
    // }, [user])

    return (
        <div>
            {
                // userState?.map((user) =>
                //     <Link to={`/ p / ${user.username}`} key={user.userId} className='flex flex-row items-center justify-between gap-20 text-white mb-4'>
                //         <div className='flex flex-row space-x-4'>
                //             <img src={`/images/avatars/${user.username ?? ''}.jpg`} alt="profile picture" className=' h-14 w-14 rounded-full' />
                //             <div className="flex flex-col justify-center">
                //                 <p className="text-sm font-bold">{user.username}</p>
                //                 <p className="text-sm">{user.fullName}</p>
                //             </div>

                //         </div>
                //         <div className="text-xs text-signUpColor">
                //             <button type='button'>Switch</button>
                //         </div>
                //     </Link>

                // )
                <Link to={`/p/${userState?.username}`} className='flex flex-row items-center justify-between gap-20 text-white mb-4'>
                    <div className='flex flex-row space-x-4'>
                        {/* <img src={`/images/avatars/${userState?.username ?? ''}.jpg`} alt="profile picture" className=' h-14 w-14 rounded-full' /> */}
                        <img src={imageURL} alt="profile picture" className=' h-14 w-14 rounded-full' />

                        <div className="flex flex-col justify-center">
                            <p className="text-sm font-bold">{userState?.username}</p>
                            <p className="text-sm">{userState?.fullName}</p>
                        </div>

                    </div>
                    <div className="text-xs text-signUpColor">
                        <button type='button'>Switch</button>
                    </div>
                </Link>
            }

        </div >
    )
}

export default User

// export const ImageLoader = async () => {
//     // const userState = useAppSelector(state => state.user.currentUser)
//     const { user } = UseAuthListener()
//     const avatarImageRef = ref(storage, 'avatars/')
//     const [imageURL, setImageURL] = useState<string>('')

//     if (user?.displayName !== undefined) {
//         await (listAll(avatarImageRef).then((response) => {
//             response.items.filter(async (item) => {
//                 // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//                 if (item.name.includes(user.displayName!)) {
//                     await getDownloadURL(item).then(url => setImageURL(url))
//                 }

//             })
//         }))
//     }
//     console.log('imageURL', imageURL);

//     return imageURL
// }