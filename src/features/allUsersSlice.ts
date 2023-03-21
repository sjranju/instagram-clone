import { createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../services/firebase"
// import { ActiveUserType } from "../hooks/use-suggestions"
// import UseAuthListener from "../hooks/use-auth-listener"
import { ActiveUserType } from "../hooks/use-user"

type AllUserStateType = {
    loading: boolean,
    users?: ActiveUserType[],
    error?: string,
    suggestedUsers?:string[]
}

const initialState: AllUserStateType = {
    loading: false,
}

export const fetchUsers = asyncThunk('allUsers/fetchUsers', async ( ) => {
    // console.log('UseAuthListener', userID);

    try {
        const userResponse = await (
            getAllUsers()
        )
        console.log('userResponse', userResponse)

        if (!userResponse) {
            console.log('userResponse!', userResponse);
        }
        // console.log('userResponse', userResponse)
        return userResponse;
    } catch (error: unknown) {
        console.log('Error while fetching users', { error });

    }
    
})


export const AllUserSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
            // console.log('fetchUsers.pending',state.loading);
            
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users=action.payload
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