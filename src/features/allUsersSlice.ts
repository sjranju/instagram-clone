/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PayloadAction, createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../services/firebase"
import { ActiveUserType } from "../hooks/use-user"

type mutualFriendType={
    suggestedUser:string,
    mutualFriend:string[]
}

type AllUserStateType = {
    loading: boolean,
    users?: ActiveUserType[],
    error?: string,
    suggestedUsers?:mutualFriendType[],
    currentUser?:ActiveUserType
}

const initialState: AllUserStateType = {
    loading: false,
}

export const fetchUsers = asyncThunk('allUsers/fetchUsers', async (userName:string,{dispatch} ) => {    
    const suggestionsSet= new Map<string,string[]>() 
    try {
        const userResponse :ActiveUserType[] = await (
            getAllUsers()
        )
        if(userResponse.length>0){
            const currentUserDetail=userResponse.find(user=>user.username==userName)
            console.log('currentUserDetail',currentUserDetail);
            
            currentUserDetail?.username!==undefined?
                dispatch(setCurrentUser(currentUserDetail))
                :console.log('This shouldn not have happened');
                
            const allUsers=userResponse.filter(user=>user.userId!=currentUserDetail?.userId)
            
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            const currentlyFollowingUsers=allUsers.filter(user=>user.followers?.includes(currentUserDetail?.userId!))
                
            currentlyFollowingUsers.map(followingUser=>{
                followingUser.following?.map(suggestedUserID=>{
                    if(suggestedUserID!==currentUserDetail?.userId && !currentUserDetail?.following?.includes(suggestedUserID)){
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
            const result=[...suggestionsSet].map(([suggestedUser,mutualFriend])=>({suggestedUser,mutualFriend}))
            dispatch(mutualFriend(result))
            return userResponse
        } 
    }
    catch (error: unknown) {
        console.log('Error while fetching users', { error });
    }
})

export const AllUserSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        setCurrentUser:(state,action:PayloadAction<ActiveUserType>)=>{
            state.currentUser=action.payload
        },
        mutualFriend:(state,action:PayloadAction<mutualFriendType[]>)=>{
            state.suggestedUsers=action.payload
        },
        updateFollow:(state,action)=>{
            state.users=action.payload
        }
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
export const {mutualFriend}=AllUserSlice.actions
export const {updateFollow}=AllUserSlice.actions
export const {setCurrentUser}=AllUserSlice.actions
