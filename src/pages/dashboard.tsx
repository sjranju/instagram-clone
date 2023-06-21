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

    useEffect(() => {
        document.body.style.backgroundColor = "black"
        return () => {
            document.body.style.backgroundColor = "white"

        }
    }, [])

    return (
        <div className=' bg-black '>
            <div className="flex flex-row h-screen w-full bg-black">
                <div className="fixed border-r border-seperator px-3 pb-5 w-24 md:w-60 w-16.5 overflow-y-visible">
                    {
                        currentUser?.username ? <Menubar /> : ''
                    }

                </div>

                <div className="ml-auto w-[calc(100%-242px)]">
                    <section className="relative flex flex-row items-stretch flex-nowrap w-full mt-4 mx-auto max-w-5xl py-8 box-border bg-black">
                        <div className="mr-16 w-full float-left max-w-2xl box-border ">
                            <Timeline />
                        </div>
                        <div className="">
                            <Sidebar />
                        </div>
                    </section>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
