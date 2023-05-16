import { createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserDetailsByUserName } from "../services/firebase"
import  { ActiveUserType } from "../hooks/use-user"

type UserStateType = {
    loading: boolean,
    error?: string,
    currentUser?:ActiveUserType,
}
 
const initialState: UserStateType = {
    loading: false,
}

export const fetchUser = asyncThunk('user/fetchUser', async (userName: string) => {
    if (userName) {
        try {
            const userResponse = await (
                getUserDetailsByUserName(userName)
            )

            if (!userResponse) {
                console.log('userResponse!', userResponse);
            }
            return userResponse;
        } catch (error: unknown) {
            console.log('Error while fetching users', { error });

        }
    }
})

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
            console.log('fetchUsers.pending',state.loading);
            
        })

        builder.addCase(fetchUser.fulfilled,(state, action) => {
            state.currentUser=action.payload
        })

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            delete state.currentUser
            state.error = action.error.message || 'Something went wrong'
            console.log('fetchUsers.errpr',state.error);

        })
    }
})

export default UserSlice.reducer
