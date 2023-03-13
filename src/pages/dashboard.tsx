/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import Timeline from './timeline'
import Header from './header'
import Sidebar from './sidebar'

function Dashboard() {
    return (
        <div className=' bg-black '>
            <div className="flex flex-row justify-between h-screen">
                <div className="border-r border-seperator px-3 pb-5 w-24 md:w-60 w-16.5 overflow-y-visible">
                    <Sidebar />
                </div>
                <div className="flex flex-col space-y-12">
                    <Header />
                    <Timeline />
                </div>

            </div>
        </div>
    )
}

export default Dashboard
