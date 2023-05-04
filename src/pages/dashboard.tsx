/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import Timeline from '../components/timeline'
import Menubar from '../components/menubar'
import Sidebar from '../components/sidebar'
import { useAppDispatch, useAppSelector } from '../store/use-state-dispatch'
import UseAuthListener from '../hooks/use-auth-listener'
import { fetchUser } from '../features/userSlice'
import { fetchUsers } from '../features/allUsersSlice'

function Dashboard() {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.user.currentUser)
    const { user } = UseAuthListener()

    useEffect(() => {
        if (user?.uid !== undefined) {
            // console.log('resImage', res);
            dispatch(fetchUser(user?.uid)).then(() => dispatch(fetchUsers()))

        }
    }, [user])

    return (
        <div className=' bg-black '>
            <div className="flex flex-row h-screen w-screen">
                <div className="border-r border-seperator px-3 pb-5 w-24 md:w-60 w-16.5 overflow-y-visible">
                    {
                        userState?.username ? <Menubar /> : ''
                    }

                </div>

                {/* <div className="border-r border-seperator px-3 sm:max-w-16.5 overflow-y-visible col-span-1"> */}
                {/* <div className="border-r border-seperator px-3 pb-5 w-24 md:w-60 w-16.5 overflow-y-visible">
                <Menubar />
            </div> */}
                <div className="flex flex-row justify-around items-stretch space-x-4 pt-1 flex-nowrap h-screen max-w-5xl">
                    <div className="max-w-md">
                        <Timeline />
                    </div>
                    <div className="mt-4 pt-8">
                        <Sidebar />
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>

    )
}

export default Dashboard
