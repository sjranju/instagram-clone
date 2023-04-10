/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PayloadAction, createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../services/firebase"
// import { ActiveUserType } from "../hooks/use-suggestions"
// import UseAuthListener from "../hooks/use-auth-listener"
import { ActiveUserType } from "../hooks/use-user"
import { RootState } from "../store/configStore"

type AllUserStateType = {
    loading: boolean,
    users?: ActiveUserType[],
    error?: string,
    currentUser?:string,
    mutualFriends?:ActiveUserType[]
}

const initialState: AllUserStateType = {
    loading: false,
}

export const fetchUsers = asyncThunk('allUsers/fetchUsers', async (_,{getState,dispatch} ) => {
    // console.log('UseAuthListener', userID);
    
    const currentState= getState() as RootState  
    
    try {
        const userResponse :ActiveUserType[] = await (
            getAllUsers()
        )
        console.log('userResponse', userResponse)

        if (userResponse) {
            console.log('currentUserStateDetials',currentState.user);
            const currentUserDetails=currentState.user.currentUser
            console.log('currentUserDetails',currentUserDetails);
            // const currentUID= currentState.user.currentUser?.find(currUser=>currUser.userId)
            // console.log(currentUID,'currentUID');
            //get list of users other than currently logged in users
            const response = userResponse.filter((user)=>user.userId !== currentUserDetails?.userId)
            console.log('Response', response)
            // const suggestedUsers=response.filter(suggestedUsers=>suggestedUsers.followers?.filter(currentUsr=>currentUsr !== currentUserDetails?.userId))
            //get the list of users where current user is not already following them - suggested users
            // const suggestedUsers=response.filter(suggestedUser=>suggestedUser.followers?.filter(suggestedUserFollowers=>suggestedUserFollowers !== currentUserDetails?.userId))
            // const suggestedUsers=response.splice(response.indexOf(response.))
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
            const suggestedUsers= response.filter(user=>!user.followers?.includes(currentUserDetails?.userId!))    
            console.log('suggestedUsers',suggestedUsers);    

            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            const myFollowingList= currentUserDetails?.following  
            console.log('myFollowingList',myFollowingList);   
            // dispatch(suggestion(suggestedUsers))
            // get the list of users 
            const mutualFriends = suggestedUsers.filter(user=>user.following?.find(followingPerson=>followingPerson == currentUserDetails?.userId))
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            //check if current user followers are following suggested users
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            // const mutualFriends = suggestedUsers.filter(user=>user.following?.includes(currentUserDetails?.followers))
            console.log('mutualFriends',mutualFriends);
             
            dispatch(mutualFrnds(mutualFriends))
            return response
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

// const getSuggestions=(users:ActiveUserType[],currentUser:string):ActiveUserType[]=>{
//     const result= users.filter(user=>user.userId!=currentUser)
//     return result
// }

export const AllUserSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        // suggestion:(state, action:PayloadAction<ActiveUserType[]>)=>{
        //     state.suggestedUsers=action.payload
        // },
        mutualFrnds:(state,action:PayloadAction<ActiveUserType[]>)=>{
            state.mutualFriends=action.payload
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
            
            // state.users?.filter(user=>user.userId )
            // state.users?.map(users=>users.userId!=state.users)
            // state.suggestedUsers=action.payload?.map(user=>{
            //     return(state.users?.map(curruser=>{return(user.userId != curruser.userId)}))
            // }
            // )
            
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            delete state.users
            state.error = action.error.message || 'Something went wrong'
        })

    }
})

export default AllUserSlice.reducer
export const {mutualFrnds}=AllUserSlice.actions
