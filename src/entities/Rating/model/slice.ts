import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RatingResponse, RatingSchema} from "./types";
import {fetchRatingData} from "./thunks.ts";

const initialState: RatingSchema = {
  data: undefined,
  isLoading: false,
  error: false,
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<RatingResponse>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
          fetchRatingData.fulfilled,
        (state, action: PayloadAction<RatingResponse>) => {
          state.data = action.payload;
          state.error = false;
          state.isLoading = false;
        },
      )
      .addCase(fetchRatingData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
  },
});

// Action creators are generated for each case reducer function
export const { actions: ratingActions } = ratingSlice;
export const { reducer: ratingReducer } = ratingSlice;
