import { configureStore } from "@reduxjs/toolkit";
import  allUsersReduer  from "../features/allUsersSlice";
import updateAllUsers from "../features/updateUsers";
import  setImageURL  from "../features/updateImageURLs";
import  getPosts  from "../features/postSlice";
import setPostURL from "../features/updatePostURL";

const store = configureStore({
    reducer: {
        allUsers:allUsersReduer,
        updateAllUsers:updateAllUsers,
        updateImageURL:setImageURL,
        userPosts:getPosts,
        updatePostURL:setPostURL
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type usedispatch = typeof store.dispatch