import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: {},
        token: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = {};
        }
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
