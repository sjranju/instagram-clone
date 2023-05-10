/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../services/firebase"
import { RootState } from "../store/configStore"
import { ActiveUserType } from "../hooks/use-user"

type mutualFriendType={
    suggestedUser:string,
    mutualFriend:string[]
}

type AllUserStateType = {
    loading: boolean,
    users?: mutualFriendType[],
    error?: string,
}

const initialState: AllUserStateType = {
    loading: false,
}

export const fetchUsers = asyncThunk('allUsers/fetchUsers', async (_,{getState} ) => {
    // console.log('UseAuthListener', userID);
    
    const currentState= getState() as RootState 
    const suggestionsSet= new Map<string,string[]>() 
    try {
        const userResponse :ActiveUserType[] = await (
            getAllUsers()
        )
        if(userResponse.length>0){
            const currentUserDetails=currentState.user.currentUser
            const allUsers=userResponse.filter(user=>user.userId!=currentUserDetails?.userId)
            
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            const currentlyFollowingUsers=allUsers.filter(user=>user.followers?.includes(currentUserDetails?.userId!))
            
            console.log('currentlyFollowingUsers',currentlyFollowingUsers);
    
            currentlyFollowingUsers.map(followingUser=>{
                followingUser.following?.map(suggestedUserID=>{
                    if(suggestedUserID!==currentUserDetails?.userId && !currentUserDetails?.following?.includes(suggestedUserID)){
                        console.log(followingUser.username,"is following",suggestedUserID);
                        userResponse.filter(response=>response.userId==suggestedUserID).map(userresponse=>{      
                            if(suggestionsSet.has(userresponse.username!))
                            {    
                                const temp=suggestionsSet.get(userresponse.username!)
                                temp!==undefined?
                                    suggestionsSet.set(userresponse.username!,[...temp,followingUser.username!])
                                    :''
                            }           
                            else{
                                suggestionsSet.set(userresponse.username!,[followingUser.username!])
                            }
                        })
                    } 
                })
            })  
            // return response
            // console.log('suggestionsSet',suggestionsSet);

            const result=[...suggestionsSet].map(([suggestedUser,mutualFriend])=>({suggestedUser,mutualFriend}))
            return result
        } 
    }
    catch (error: unknown) {
        console.log('Error while fetching users', { error });
    }
})
// return userResponse;
//compute and dispatch or return
// vhvhjbhjbcghcfh
// dist


export const AllUserSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true            
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users=action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            delete state.users
            state.error = action.error.message || 'Something went wrong'
        })

    }
})

export default AllUserSlice.reducer
