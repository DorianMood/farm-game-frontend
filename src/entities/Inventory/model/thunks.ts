import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Inventory} from "./types";

export const fetchInventory = createAsyncThunk<
  Inventory,
  undefined,
  ThunkConfig<string>
>("inventory/fetchInventoryList", async (_, thunkApi) => {
  const {extra, rejectWithValue} = thunkApi;

  try {
    const response = await extra.api.get<Inventory>(`/inventory`);

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const activateInventory = createAsyncThunk<
    undefined,
    { id: string },
    ThunkConfig<string>
>("inventory/activateInventory", async ({ id }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<undefined>("/inventory/activate", {
      id,
    });

    return response.data;
  } catch (e) {
    return rejectWithValue("error");
  }
});