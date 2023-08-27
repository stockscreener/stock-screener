import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import navbarSlice from "./features/navbarSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        navbar: navbarSlice
    }
})