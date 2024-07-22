import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Products } from "./types";

export const fetchProductsData = createAsyncThunk<
  Products,
  { filter: string },
  ThunkConfig<string>
>("user/fetchProductsData", async ({ filter }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Products>(
      `/products?filter=${filter}`,
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const purchaseProduct = createAsyncThunk<
  Products,
  { productId: string },
  ThunkConfig<string>
>("user/updateProductsData", async ({ productId }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<Products>("/products/purchase", {
      id: productId,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const sellProduct = createAsyncThunk<
  Products,
  { slotId: string },
  ThunkConfig<string>
>("shop/sellProducts", async ({ slotId }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<Products>("/products/sell", {
      id: slotId,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
