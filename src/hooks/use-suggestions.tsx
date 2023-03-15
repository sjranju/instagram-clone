/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useEffect, useState } from 'react'
import { getSuggestionDetails } from '../services/firebase'
import useUser from './use-user'
// import cloneDeep from 'lodash.clonedeep'

export interface ActiveUserType {
    dateCreated?: number
    emailAddress?: string
    followers?: string[]
    following?: string[]
    fullName?: string
    userId?: string
    username?: string
}

function useSuggestions() {
    const { user } = useUser()
    const [suggestedUsers, setSuggestedUsers] = useState<ActiveUserType[]>([{
        dateCreated: 0,
        emailAddress: '',
        followers: [],
        following: [],
        fullName: '',
        userId: '',
        username: ''
    }])
    // const [suggestedFollowers, setSuggestedFollowers] = useState<ActiveUserType>({
    //     dateCreated: 0,
    //     emailAddress: '',
    //     followers: [],
    //     following: [],
    //     fullName: '',
    //     userId: '',
    //     username: ''
    // })

    useEffect(() => {
        async function getUserSuggestionsUserId() {
            if (user != null) {
                const suggestions: ActiveUserType[] = await getSuggestionDetails([user.userId!, ...user.following!])
                setSuggestedUsers(suggestions)
                console.log('suggestedUsers', suggestedUsers)
            }
        }

        if ((user?.userId) != null) {
            void getUserSuggestionsUserId()
        }
    }, [user])

    // useEffect(() => {
    //     async function getSuggestedFollowerDetails() {
    //         if (suggestedUsers.followers != null) {
    //             const suggestedUserId = [...suggestedUsers.followers]
    //             const [follwerDetails] = await getUserDetailsByUserId(suggestedUserId[0])
    //             setSuggestedFollowers(follwerDetails)
    //         }
    //     }
    //     // const suggestedFollowersClone = cloneDeep(suggestedFollowers)
    //     // suggestedFollowersClone.followers?.forEach((follower) => {
    //     //     follower.
    //     // })

    //     if (suggestedUsers != null) {
    //         void getSuggestedFollowerDetails()
    //     }
    // }, [suggestedUsers])

    console.log('suggestedUsers', suggestedUsers)
    // console.log('suggestedFollowers', suggestedFollowers)

    return ({ suggestions: suggestedUsers })
}

export default useSuggestions
