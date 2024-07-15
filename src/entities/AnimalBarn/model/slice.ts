import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AnimalBarnSchema, AnimalBarn} from "./types";
import {fetchAnimalBarns, harvestAnimals, startAnimals} from "./thunks";

const initialState: AnimalBarnSchema = {
  isLoading: false,
  error: false,
  data: {
    animalBarns: undefined,
  },
};

export const animalBarnsSlice = createSlice({
  name: "animalBarns",
  initialState,
  reducers: {
    initBedsData: (state) => {
      state.data.animalBarns = [];
    },
    setBedsData: (state, action: PayloadAction<AnimalBarn[]>) => {
      state.data.animalBarns = action.payload;
    },
    resetBedsDate: (state) => {
      state.data.animalBarns = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalBarns.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(
        fetchAnimalBarns.fulfilled,
        (state, action: PayloadAction<AnimalBarn[]>) => {
          state.isLoading = false;
          state.error = false;
          state.data.animalBarns = action.payload;
        }
      )
      .addCase(fetchAnimalBarns.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(harvestAnimals.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(
        harvestAnimals.fulfilled,
        (state, action: PayloadAction<AnimalBarn[]>) => {
          state.isLoading = false;
          state.error = false;
          state.data.animalBarns = action.payload;
        }
      )
      .addCase(harvestAnimals.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(startAnimals.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(startAnimals.fulfilled, (state) => {
        state.error = false;
        state.isLoading = false;
      })
      .addCase(startAnimals.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {actions: animalBarnsActions} = animalBarnsSlice;
export const {reducer: animalBarnsReducer} = animalBarnsSlice;
