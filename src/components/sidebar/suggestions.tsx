/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react'
// import { useAppSelector } from '../../store/use-state-dispatch'

function Suggestions() {
    // const suggestionState = useAppSelector(state => state.allUsers.users)

    return (
        <div className="flex flex-col justify-center text-white text-sm">

            <div className="flex flex-row justify-between font-semibold mb-4">
                <p className="text-activeBorderForInput">Suggestions for you</p>
                <p className='text-xs flex justify-center items-center'>See all</p>
            </div>

        </div>
    )
}

export default Suggestions
