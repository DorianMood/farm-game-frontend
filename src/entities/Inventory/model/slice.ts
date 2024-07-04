import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InventorySchema, Inventory} from "./types";
import {fetchInventory} from "./thunks";

const initialState: InventorySchema = {
  isLoading: false,
  error: false,
  data: {
    inventory: undefined,
  },
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    initBedsData: (state) => {
      state.data.inventory = undefined;
    },
    setBedsData: (state, action: PayloadAction<Inventory>) => {
      state.data.inventory = action.payload;
    },
    resetBedsDate: (state) => {
      state.data.inventory = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(
        fetchInventory.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          state.isLoading = false;
          state.error = false;
          state.data.inventory = action.payload;
        }
      )
      .addCase(fetchInventory.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {actions: inventoryActions} = inventorySlice;
export const {reducer: inventoryReducer} = inventorySlice;
