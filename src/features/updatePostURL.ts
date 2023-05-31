/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/configStore";
import cloneDeep from "lodash.clonedeep";
import { updatePost } from "./postSlice";

type initialStateType={
    url:string,
    userId:string
}
const initialState:initialStateType={
    url:'',
    userId:''
}

export const setPostURL=createAsyncThunk('updatePost/setPostURL',({userId,url}:initialStateType,{getState,dispatch})=>{
    const state=getState() as RootState
    const stateCopy=cloneDeep(state.userPosts.postData)
    
    if(stateCopy && stateCopy.find(usr=>usr.userId==userId) && userId){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if(stateCopy.find(usr=>usr.userId==userId)!.imageSrc==undefined){
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            stateCopy.find(usr=>usr.userId==userId)!.imageSrc=url
            dispatch(updatePost(stateCopy))
        }
    }
})

export const updateLikes=createAsyncThunk('updatePost/updateLikes',(userId:string,{getState,dispatch})=>{
    const state=getState() as RootState
    const stateCopy=cloneDeep(state.userPosts.postData)
    const currentUser=state?.allUsers?.currentUser
    
    if(stateCopy && stateCopy.find(usr=>usr.userId==userId) && userId && currentUser?.userId){
        if(stateCopy.find(usr=>usr.userId==userId)?.likes?.includes(currentUser.userId)){
            stateCopy.find(usr=>usr.userId==userId)?.likes?.
                splice(stateCopy.find(usr=>usr.userId==userId)?.likes?.indexOf(currentUser.userId)!,1)
            console.log('remove',stateCopy);           
        }else{
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            stateCopy.find(usr=>usr.userId==userId)!.likes?.push(currentUser.userId)
            console.log(stateCopy);
            
        }
        dispatch(updatePost(stateCopy))
    }
})

export const updatePostURL=createSlice({
    name:'updatePost',
    initialState:initialState,
    reducers:{
        
    }
})

export default updatePostURL.reducer