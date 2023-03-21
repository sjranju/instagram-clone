import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import  allUsersReduer  from "../features/allUsersSlice";
// import { reduxFirestore,firestoreReducer } from "redux-firestore";
// import { app } from "../lib/firebaseConfig";

const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers:allUsersReduer
        // firestore:firestoreReducer        
    }
})

// const rrfConfig = {
//     userProfile: 'users'
//     // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
//   }

export default store
export type RootState = ReturnType<typeof store.getState>
export type usedispatch = typeof store.dispatch