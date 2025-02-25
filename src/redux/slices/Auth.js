import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    name: localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : null,
    id: localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearToken: (state, action) => {
            state.token = null
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        clearName: (state, action) => {
            state.name = null
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        clearId: (state, action) => {
            state.id = null
        }
    }
})

export const { setToken, clearToken, setName, clearName, setId, clearId } = authSlice.actions
export default authSlice.reducer