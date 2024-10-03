import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchProductsData, purchaseProduct, sellProduct} from "./thunks";
import {ProductsSchema, Products} from "./types";

const initialState: ProductsSchema = {
    data: undefined,
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
            .addCase(purchaseProduct.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(purchaseProduct.fulfilled, (state) => {
                state.isUpdating = false;
            })
            .addCase(purchaseProduct.rejected, (state) => {
                state.isUpdating = false;
            })
            .addCase(sellProduct.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(sellProduct.fulfilled, (state) => {
                state.isUpdating = false;
            })
            .addCase(sellProduct.rejected, (state) => {
                state.isUpdating = false;
            })
    },
});

// Action creators are generated for each case reducer function
export const {actions: productsActions} = productsSlice;
export const {reducer: productsReducer} = productsSlice;
