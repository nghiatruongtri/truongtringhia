import {createSlice} from "@reduxjs/toolkit";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken"); // delete token from storage
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
        setCredentials: (state, {payload}) => {
            state.userInfo = payload;
        },
    },
    extraReducers: (builder) => {
    },
});

export const {logout, setCredentials} = authSlice.actions;

export default authSlice.reducer;
