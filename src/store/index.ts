import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";
import { githubReduser } from "./github/githubSlice";

export const store = configureStore({
    reducer : {
        [githubApi.reducerPath] : githubApi.reducer,
        github : githubReduser
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>