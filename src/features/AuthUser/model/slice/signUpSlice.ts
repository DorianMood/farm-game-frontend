import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "../services/signUp/signUp";
import {SignUpSchema} from "../types/signUpSchema";

const initialState: SignUpSchema = {
    isLoading: false,
    error: ""
};

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: signUpActions } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
