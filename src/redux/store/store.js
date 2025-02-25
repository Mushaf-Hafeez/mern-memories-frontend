import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../slices/Auth'

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store