import { ActionCreatorWithPayload, PayloadAction, createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserDetailsByUserId } from "../services/firebase"
import UseAuthListener from "../hooks/use-auth-listener"
import { stat } from "fs"
import { ActiveUserType } from "../hooks/use-suggestions"

type UserStateType = {
    loading: boolean,
    user?: ActiveUserType,
    error?: string
}

const initialState: UserStateType = {
    loading: false,
}

export const fetchUsers = asyncThunk('users/fetchUsers', async (_, { dispatch, abort }) => {
    const { user } = UseAuthListener()
    if (user) {
        try {
            const [userResponse] = await (
                getUserDetailsByUserId(user.uid)
            )
            if (!userResponse) {
                // TODO: Handle this
                abort()
            }
            return userResponse;
        } catch (error: any) {
            console.log('Error while fetching users', { error });
            // TODO: Dispatch something proper
            // dispatch()
            abort()
        }
    }
    // Handle the case here
    abort()
})

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            delete state.user
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default UserSlice.reducer