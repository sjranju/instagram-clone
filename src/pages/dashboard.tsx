/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import Timeline from '../components/timeline'
import Menubar from '../components/menubar'
import Sidebar from '../components/sidebar'
import { useAppDispatch, useAppSelector } from '../store/use-state-dispatch'
import UseAuthListener from '../hooks/use-auth-listener'
import { fetchUsers } from '../features/allUsersSlice'
import { getPosts } from '../features/postSlice'

function Dashboard() {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.allUsers.currentUser)
    const posts = useAppSelector(state => state.userPosts.postData)
    const { user } = UseAuthListener()

    useEffect(() => {
        if (user?.uid !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
            dispatch(fetchUsers(user?.displayName!))
        }
    }, [user])

    useEffect(() => {
        if (currentUser?.following !== undefined) {
            dispatch(getPosts(currentUser.following))
        }
    }, [currentUser])

    return (
        <div className=' bg-black '>
            <div className="flex flex-row h-screen w-screen">
                <div className="border-r border-seperator px-3 pb-5 w-24 md:w-60 w-16.5 overflow-y-visible">
                    {
                        currentUser?.username ? <Menubar /> : ''
                    }

                </div>

                <div className="flex flex-row justify-between items-stretch flex-nowrap max-w-xl w-full mt-4 mx-auto pt-8">
                    <div className="mr-16">
                        <Timeline />
                    </div>
                    <div className="">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
