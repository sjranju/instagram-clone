/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PayloadAction, createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../services/firebase"
import { ActiveUserType } from "../hooks/use-user"
import { RootState } from "../store/configStore"

type mutualFriendType={
    suggestedUser:string[],
    mutualFrnd:string[]
}

type AllUserStateType = {
    loading: boolean,
    users?: ActiveUserType[],
    error?: string,
    currentUser?:string,
    suggestedUser?:mutualFriendType[]
}

const initialState: AllUserStateType = {
    loading: false,
}

export const fetchUsers = asyncThunk('allUsers/fetchUsers', async (_,{getState,dispatch} ) => {
    // console.log('UseAuthListener', userID);
    
    const currentState= getState() as RootState 
    const suggestionsSet= new Set<mutualFriendType>() 
    const mutualFriendSet=new Set<string>()
    // const suggestedUserSet= new Set<string>()                       
    // const suggestedUsers:string[]=[]
    let mutualFriends:string[]=[]
    
    try {
        const userResponse :ActiveUserType[] = await (
            getAllUsers()
        )
        // console.log('userResponse', userResponse)
        
        if (userResponse) {
            // console.log('currentUserStateDetials',currentState.user);
            const currentUserDetails=currentState.user.currentUser
            const allUsers=userResponse.filter(user=>user.userId!=currentUserDetails?.userId)

            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            const currentlyFollowingUsers=allUsers.filter(user=>user.followers?.includes(currentUserDetails?.userId!))

            console.log('currentlyFollowingUsers',currentlyFollowingUsers);
            const suggestedUsersArray: string[]=[]
            currentlyFollowingUsers.map(followingUser=>{
                followingUser.following?.map(suggestedUserID=>{
                    if(suggestedUserID!==currentUserDetails?.userId && !currentUserDetails?.following?.includes(suggestedUserID)){
                        console.log(followingUser.username,"is following",suggestedUserID);
                        userResponse.filter(response=>response.userId==suggestedUserID).map(userresponse=>{
                            if(!suggestedUsersArray.includes(userresponse.username!))
                                suggestedUsersArray.push(userresponse.username!)
                            // suggestedUserSet.add(userresponse.username!)                          
                        })
                    } 
                    console.log('suggestedUsersArray',suggestedUsersArray)
                    // suggestedUsers=[...suggestedUserSet]
                    mutualFriendSet.add(followingUser.username!)
                    mutualFriends=[...mutualFriendSet]
                    console.log('mutualFriends',mutualFriends);
                })

            })
            if(suggestedUsersArray.length>0 && mutualFriends.length>0)
                suggestionsSet.add({suggestedUser:suggestedUsersArray,mutualFrnd:mutualFriends}) 
            mutualFriendSet.clear()                     

            const suggestions=[...suggestionsSet]
            console.log('suggestions',suggestions);
            dispatch(mutualFriend(suggestions))
            
            return userResponse
            // return response
        }

        if(!userResponse)
        {
            console.log('userResponse!', userResponse); 
        }
        // return userResponse;
        //compute and dispatch or return
        // vhvhjbhjbcghcfh
        // dist
    } catch (error: unknown) {
        console.log('Error while fetching users', { error });

    }
    
})

export const AllUserSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        // suggestion:(state, action:PayloadAction<ActiveUserType[]>)=>{
        //     state.suggestedUsers=action.payload
        // },
        mutualFriend:(state,action:PayloadAction <mutualFriendType[]>)=>{
            state.suggestedUser=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
            // console.log('fetchUsers.pending',state.loading);
            
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
export const {mutualFriend}=AllUserSlice.actions
