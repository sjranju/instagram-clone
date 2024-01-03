import { configureStore } from "@reduxjs/toolkit";
import allUsersReduer from "../features/allUsersSlice";
import updateAllUsers from "../features/updateUsers";
import setImageURL from "../features/updateImageURLs";
import getPosts from "../features/postSlice";
import setPostURL from "../features/updatePostURL";
import { api } from "../RTKQuery/apiSlice";

const store = configureStore({
    reducer: {
        allUsers: allUsersReduer,
        updateAllUsers: updateAllUsers,
        updateImageURL: setImageURL,
        userPosts: getPosts,
        updatePostURL: setPostURL,
        [api.reducerPath]: api.reducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(api.middleware)
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type usedispatch = typeof store.dispatch