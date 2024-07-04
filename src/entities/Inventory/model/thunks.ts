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
