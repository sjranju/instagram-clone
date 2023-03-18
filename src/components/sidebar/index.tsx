/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
// import useSuggestions from '../../hooks/use-suggestions'
// import Skeleton from 'react-loading-skeleton'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Sidebar() {
    const { user } = useUser()
    // const { suggestions } = useSuggestions()
    // console.log('suggestions', suggestions)

    return (
        <div className="">
            console.log(username,{user?.username});

            {(user?.fullName != null) && (user.username != null)
                ? <User fullName={user?.fullName} username={user.username} displayName={user.username} />
                : ''
                // : <Skeleton count={1} height={61} />
            }
            {/* {
                (user.followers?.length !== undefined) && (suggestions.username != null) && (suggestions.username != null) && (suggestedFollowerDetails.username != null)
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    ? <Suggestions username={suggestions.username} followers={suggestions.followers!} suggestedFollowerDetails={suggestedFollowerDetails?.username} />
                    // : <Skeleton count={1} height={61} />
                    : ''
            } */}

            <Suggestions />

        </div>
    )
}

export default Sidebar
