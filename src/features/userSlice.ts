import { createAsyncThunk as asyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserDetailsByUserId } from "../services/firebase"
// import { ActiveUserType } from "../hooks/use-suggestions"
// import UseAuthListener from "../hooks/use-auth-listener"
import  { ActiveUserType } from "../hooks/use-user"
// import { suggestion } from "./allUsersSlice"
// import { fetchUsers } from "./allUsersSlice"

type UserStateType = {
    loading: boolean,
    error?: string,
    currentUser?:ActiveUserType,
    currentlyFollowingUsers?:string[],
    suggestedUsers?:ActiveUserType[]
}
 
const initialState: UserStateType = {
    loading: false,
}

//  const currentUserId = user?.uid
// export const fetchUsers = asyncThunk('users/fetchUsers', async (_, { dispatch, abort }) => {
//     const { user } = UseAuthListener()
//     console.log('UseAuthListener', user);

//     if (user) {
//         try {
//             const [userResponse] = await (
//                 getUserDetailsByUserId(user.uid)
//             )
//             console.log('userResponse', userResponse)

//             if (!userResponse) {
//                 console.log('userResponse', userResponse);

//                 // TODO: Handle this
//                 abort()
//             }
//             console.log('userResponse', userResponse)
//             return userResponse;
//         } catch (error: any) {
//             console.log('Error while fetching users', { error });
//             // TODO: Dispatch something proper
//             // dispatch()
//             abort()
//         }
//     }
//     // Handle the case here
//     abort()
// })

export const fetchUser = asyncThunk('user/fetchUser', async (userID: string) => {
    // console.log('UseAuthListener', userID);
    if (userID) {
        try {
            const userResponse = await (
                getUserDetailsByUserId(userID)
                // getAllUsers()
            )
            console.log('userResponse', userResponse)

            if (!userResponse) {
                console.log('userResponse!', userResponse);
            }
            // console.log('userResponse', userResponse)
            // if(userResponse)
            // {
            //     const filteredUID=userResponse.filter((user)=>{(user.userId)})
            //     dispatch(suggestion(filteredUID))
            // }
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
            // const currentUsr = action.payload
            // state.currentlyFollowingUsers=action.payload?.map(user=>user.following)
            // state.currentUser?.filter(user=>user.userId !=currentlyFollowingUsers)
            console.log('currentlyFollowingUsers',state.currentlyFollowingUsers);
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
