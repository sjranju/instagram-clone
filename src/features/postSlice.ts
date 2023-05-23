import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostDetails } from "../services/firebase";
import cloneDeep from "lodash.clonedeep";

export type postDataType={
    captions?:string,
    comments?:{
        comment?:string,
        displayName?:string
    }[],
    likes?:string[],
    photoId?:string,
    userId?:string,
}

type initialStateType={
    postData?:postDataType[],
    currentlyFollowingUserPost?:postDataType[]
    loading:boolean,
    error?:string
}

const initialState:initialStateType={
    loading:false
}

export const getPosts=createAsyncThunk('postSlice/posts',async(users:string[],{dispatch})=>{
    try{
        const userResponse:postDataType[]=await (getPostDetails())
        console.log(userResponse);
        
        if(userResponse){
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const posts=userResponse.filter(user=>users.includes(user.userId!))
            dispatch(currentlyFollowingUserPosts(posts))
            return userResponse
        }   
    }
    catch(error:unknown){
        console.log(error);
        
    }
})

const postSlice=createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        currentlyFollowingUserPosts:(state,action)=>{
            state.currentlyFollowingUserPost=action.payload
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getPosts.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getPosts.fulfilled,(state,action)=>{
            state.postData=action.payload
            state.loading=false
        })
        builder.addCase(getPosts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || 'Something went wrong'
        })
    }
})

export default postSlice.reducer
export const {currentlyFollowingUserPosts}=postSlice.actions