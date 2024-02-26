import { configureStore } from '@reduxjs/toolkit'
import { articleApi, commentApi } from "./services/";

export const makeStore = () => {
  return configureStore({
    reducer: {
    [   articleApi.reducerPath]: articleApi.reducer,
    [   commentApi.reducerPath]: commentApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([articleApi.middleware, commentApi.middleware]),
  })
}