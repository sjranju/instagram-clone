/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react'
import { useAppSelector } from '../../store/use-state-dispatch'

function Suggestions() {
    const mutualFriendsState = useAppSelector(state => state.allUsers.mutualFriends)

    return (
        <div className="flex flex-col justify-center text-white text-sm">

            <div className="flex flex-row justify-between font-semibold mb-4">
                <p className="text-activeBorderForInput">Suggestions for you</p>
                <p className='text-xs flex justify-center items-center'>See all</p>
            </div>
            {
                mutualFriendsState?.map(suggestedUser =>
                    <div className="flex flex-row items-center justify-between mb-4" key={suggestedUser.userId}>
                        <div className="flex flex-row space-x-4 justify-center items-center">
                            <div className="">
                                <img src={`/images/avatars/${suggestedUser.username}.jpg`} alt="profile picture" className='w-10 h-10 rounded-full' />
                            </div>
                            <div className="">
                                <p className='font-semibold'>{suggestedUser.username}</p>
                                {/* <div className="flex flex-row">followed by {suggestedFollowerDetails}
                                {followers.length === 1
                                    ? ''
                                    : <p>
                                        &nbsp;+{followers.length - 1} more
                                    </p>
                                }
                            </div> */}
                            </div>
                        </div>
                        <div className="flex text-xs text-signUpColor">
                            <button type='button' className='p-0 m-0'>Follow</button>
                        </div>
                    </div>
                    // <Link to={`/p/${user?.username}`} key={user.userId} className='flex flex-row items-center justify-between gap-20 text-white mb-4'>
                    //     <div className='flex flex-row space-x-4'>
                    //         <img src={`/images/avatars/${user?.username ?? ''}.jpg`} alt="profile picture" className=' h-10 w-10 rounded-full' />
                    //         <div className="flex flex-col justify-center">
                    //             <p className="text-sm font-bold">{user?.username}</p>
                    //             {/* <p className="text-sm">{user?.fullName}</p> */}
                    //         </div>

                    //     </div>
                    //     <div className="text-xs text-signUpColor">
                    //         <button type='button'>Switch</button>
                    //     </div>
                    // </Link>
                )


            }


        </div>
    )
}

export default Suggestions
