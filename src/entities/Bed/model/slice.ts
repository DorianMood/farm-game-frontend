import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BedsSchema, Bed } from "./types";
import { fetchBedsData, harvestBeds, plantBeds } from "./thunks";

const initialState: BedsSchema = {
  isLoading: false,
  error: false,
  data: {
    beds: [],
  },
};

export const bedsSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {
    initBedsData: (state) => {
      state.data.beds = [];
    },
    setBedsData: (state, action: PayloadAction<Bed[]>) => {
      state.data.beds = action.payload;
    },
    resetBedsDate: (state) => {
      state.data.beds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBedsData.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(
        fetchBedsData.fulfilled,
        (state, action: PayloadAction<Bed[]>) => {
          state.isLoading = false;
          state.error = false;
          state.data.beds = action.payload;
        },
      )
      .addCase(fetchBedsData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(harvestBeds.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(harvestBeds.fulfilled, (state, action: PayloadAction<Bed[]>) => {
        state.isLoading = false;
        state.error = false;
        state.data.beds = action.payload;
      })
      .addCase(harvestBeds.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(plantBeds.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(plantBeds.fulfilled, (state) => {
        state.error = false;
        state.isLoading = false;
      })
      .addCase(plantBeds.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: bedsActions } = bedsSlice;
export const { reducer: bedsReducer } = bedsSlice;
