/**
 * Redux store configuration
 * Configures the store with RTK Query and all slices
 */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/authSlice";
import authUiReducer from "./features/authUiSlice";
import bettingReducer from "./features/bettingSlice";
import userReducer from "./features/userSlice";
import walletReducer from "./features/walletSlice";

export const store = configureStore({
  reducer: {
    // RTK Query
    [baseApi.reducerPath]: baseApi.reducer,

    // Feature slices
    auth: authReducer,
    authUi: authUiReducer,
    betting: bettingReducer,
    user: userReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state for serialization checks
        ignoredActions: [baseApi.util.resetApiState.type],
        ignoredPaths: [baseApi.reducerPath],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Setup listeners for RTK Query (refetchOnFocus, refetchOnReconnect)
setupListeners(store.dispatch);

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
