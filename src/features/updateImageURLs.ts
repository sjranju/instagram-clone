import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/configStore";
import { setCurrentUser, updateUserDetails } from "./allUsersSlice";
import cloneDeep from "lodash.clonedeep";
import { updateCurrentUser } from "firebase/auth";

type initialStateType = {
    url: string,
    user: string
}
const initialState: initialStateType = {
    url: '',
    user: ''
}

export const setImageURL = createAsyncThunk('updateImageURL/setImageURL', async ({ url, user }: initialStateType, { getState, dispatch }) => {
    const state = getState() as RootState
    const stateCopy = cloneDeep(state.allUsers.users)
    const currentUser = cloneDeep(state.allUsers.currentUser)

    if (stateCopy && stateCopy.find(usr => usr.username == user) && user) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (stateCopy.find(usr => usr.username == user)!.imageURL == undefined) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            stateCopy.find(usr => usr.username == user)!.imageURL = url
            console.log('stateCopy', stateCopy)
            dispatch(updateUserDetails(stateCopy))
        }
    }
    if (currentUser && currentUser?.imageURL === undefined && user) {
        currentUser.imageURL = url
        dispatch(setCurrentUser(currentUser))
    }
})

export const updateImageURL = createSlice({
    name: 'ImageURL',
    initialState: initialState,
    reducers: {

    }
})

export default updateImageURL.reducer