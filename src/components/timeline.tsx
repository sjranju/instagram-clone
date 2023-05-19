/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import { useAppSelector } from '../store/use-state-dispatch'

function Timeline() {
    const currentlyFollowingUsers = useAppSelector(state => state.allUsers.currentUser?.following)

    useEffect(() => {
        <div className=""></div>
    }, [])

    return (
        <div className='flex text-white'>
            I am Timeline
        </div>
    )
}

export default Timeline
