/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PayloadAction, createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../services/firebase"
import { ActiveUserType } from "../hooks/use-user"
import { RootState } from "../store/configStore"

type mutualFriendType={
    suggestedUser:ActiveUserType[],
    mutualFrnd:ActiveUserType[]
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
    const suggestedUserSet= new Set<ActiveUserType>() 
    
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
            const myFollowingUsers=allUsers.filter(user=>user.followers?.includes(currentUserDetails?.userId!))

            console.log('myFollowingUsers',myFollowingUsers);
            
            myFollowingUsers.map(response=>{
                response.following?.map(followingUser=>{
                    if(followingUser!==currentUserDetails?.userId && !currentUserDetails?.following?.includes(followingUser)){
                        console.log("I am here",response.username);
                        userResponse.filter(user=>user.userId==followingUser).map(userresponse=>suggestedUserSet.add(userresponse))
                        const suggestedUsers=[...suggestedUserSet]
                        suggestionsSet.add({suggestedUser:suggestedUsers,mutualFrnd:[response]})           
                    }
                })
            })

            const suggestions=[...suggestionsSet]
            console.log(suggestionsSet,'suggestionsSet');
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
