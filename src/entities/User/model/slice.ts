import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { UserSchema, User } from "./types";
import { isAuthentificatedThunk, fetchUserData } from "./thunks";

const initialState: UserSchema = {
  isAuthentificated: {
    data: null,
    isLoading: false,
    error: false,
  },
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.data = JSON.parse(user);
      }
    },
    logout: (state) => {
      state.data = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.data = action.payload;
          state.error = false;
          state.isLoading = false;
        },
      )
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(isAuthentificatedThunk.pending, (state) => {
        state.isAuthentificated.data = false;
        state.isAuthentificated.isLoading = true;
      })
      .addCase(isAuthentificatedThunk.fulfilled, (state, action) => {
        state.isAuthentificated.data = action.payload;
        state.isAuthentificated.isLoading = false;
      })
      .addCase(isAuthentificatedThunk.rejected, (state) => {
        state.isAuthentificated.data = false;
        state.isAuthentificated.isLoading = false;
        state.isAuthentificated.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
