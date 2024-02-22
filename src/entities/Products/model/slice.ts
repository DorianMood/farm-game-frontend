import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductsData, updateProductsData } from "./thunks";
import { ProductsSchema, Products } from "./types";

const initialState: ProductsSchema = {
  data: [],
  error: false,
  isLoading: false,
  isUpdating: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductsData.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.data = action.payload;
          state.isLoading = false;
          state.error = false;
        },
      )
      .addCase(fetchProductsData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(updateProductsData.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(
        updateProductsData.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.data = action.payload;
          state.isUpdating = false;
          state.error = false;
        },
      )
      .addCase(updateProductsData.rejected, (state) => {
        state.isUpdating = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: productsActions } = productsSlice;
export const { reducer: productsReducer } = productsSlice;
