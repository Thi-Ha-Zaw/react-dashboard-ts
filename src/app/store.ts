import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { authApi } from "./service/authApi";
import { userApi } from "./service/userApi";
import userSlice from "./features/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([authApi.middleware, userApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
