import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/configStore";
import { updateUserDetails } from "./allUsersSlice";
import cloneDeep from "lodash.clonedeep";

type initialStateType={
    url:string,
    suggestedUser:string
}
const initialState:initialStateType={
    url:'',
    suggestedUser:''
}

export const setImageURL=createAsyncThunk('updateImageURL/setImageURL',async({url,suggestedUser}:initialStateType,{getState,dispatch})=>{
    const state=getState() as RootState
    const stateCopy=cloneDeep(state.allUsers.users)
    
    if(stateCopy && stateCopy.find(user=>user.username==suggestedUser) && suggestedUser){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if(stateCopy.find(user=>user.username==suggestedUser)!.imageURL==undefined){
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            stateCopy.find(user=>user.username==suggestedUser)!.imageURL=url
            dispatch(updateUserDetails(stateCopy))
        }
    }
})

export const updateImageURL=createSlice({
    name:'ImageURL',
    initialState:initialState,
    reducers:{
        
    }
})

export default updateImageURL.reducer