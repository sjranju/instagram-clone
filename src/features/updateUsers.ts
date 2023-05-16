import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk as asyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/configStore";
import cloneDeep from 'lodash.clonedeep'
import { updateFollow } from "./allUsersSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export type functionParemeterType={
    currentUserId:string,
    suggestedUserId :string,
    operation:'add'|'remove'
}

type updateFollowType={
    loading:boolean
}

const initialState:updateFollowType={
    loading:false
}

export const updateAllUsers=asyncThunk('updateUsers/updateFollowersAndFollowingList',async({currentUserId,suggestedUserId,operation}:functionParemeterType,{getState,dispatch})=>{
    const currentState=getState() as RootState
    const currentUserDocRef = doc(db, `users/${currentUserId}`)
    const suggestedUserDocRef = doc(db, `users/${suggestedUserId}`)

    if(operation=='add'){
        updateDoc(currentUserDocRef, { following: arrayUnion(suggestedUserId) }).then(() => {
            updateDoc(suggestedUserDocRef, { followers: arrayUnion(currentUserId) })
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                .then(() => {
                    const stateCopy=cloneDeep(currentState.allUsers.users)
                    if(stateCopy!==undefined){
                        stateCopy?.find(user=>user.userId==currentUserId)?.following?.push(suggestedUserId)
                        stateCopy?.find(user=>user.userId==suggestedUserId)?.followers?.push(currentUserId)                        
                        dispatch(updateFollow(stateCopy))
                    }
                })
        })
            .catch((error: unknown) => console.log(error))
    }
    else{
        updateDoc(currentUserDocRef, { following: arrayRemove(suggestedUserId) }).then(() => {
            updateDoc(suggestedUserDocRef, { followers: arrayRemove(currentUserId) })
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                .then(() => {
                    const stateCopy=cloneDeep(currentState.allUsers.users)
                    if(stateCopy!==undefined){
                        // stateCopy?.find(user=>user.userId==currentUserId)?.following?.push(suggestedUserId)
                        stateCopy?.find(user=>user.userId==currentUserId)?.following?.filter(user=>user!==suggestedUserId)
                        stateCopy?.find(user=>user.userId==suggestedUserId)?.followers?.filter(user=>user!==currentUserId)                        
                        dispatch(updateFollow(stateCopy))
                    }
                })
        })
            .catch((error: unknown) => console.log(error))
    }
})


export const updateUsers=createSlice({
    name:'updateUsers',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(updateAllUsers.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(updateAllUsers.fulfilled,(state)=>{
            state.loading=false
        })
        builder.addCase(updateAllUsers.rejected,(state)=>{
            state.loading=false
        })      
    }
}
)

export default updateUsers.reducer
// export const {updateFollowList}=updateFollow.actions