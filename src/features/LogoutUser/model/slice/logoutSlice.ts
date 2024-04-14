import { createSlice } from "@reduxjs/toolkit";
import {LogoutSchema} from "../types/logoutSchema";
import {logout} from "../services/logout/logout";

const initialState: LogoutSchema = {
    isLoading: false,
    error: ''
};

export const logoutSlice = createSlice({
    name: "logout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { reducer: logoutReducer } = logoutSlice;
