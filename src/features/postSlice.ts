import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostDetails } from "../services/firebase";

export type postDataType={
    caption?:string,
    comments?:{
        comment?:string,
        displayName?:string
    }[],
    likes?:string[],
    photoId?:string,
    userId?:string,
    imageSrc?:string
}

type initialStateType={
    // postData?:postDataType[],
    postData?:postDataType[]
    loading:boolean,
    error?:string
}

const initialState:initialStateType={
    loading:false
}

export const getPosts=createAsyncThunk('posts/getPosts',async(users:string[])=>{
    try{
        const userResponse:postDataType[]=await (getPostDetails())
        
        if(userResponse){
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const posts=userResponse.filter(user=>users.includes(user.userId!))
            // dispatch(currentlyFollowingUserPosts(posts))
            return posts
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
        // currentlyFollowingUserPosts:(state,action)=>{
        //     state.currentlyFollowingUserPost=action.payload
        //     state.loading=false
        // },
        updatePost:(state,action)=>{
            state.postData=action.payload
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
// export const {currentlyFollowingUserPosts}=postSlice.actions
export const {updatePost}=postSlice.actions