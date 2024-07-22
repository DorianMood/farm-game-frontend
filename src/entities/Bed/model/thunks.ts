import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Bed } from "./types";
import { SeedEnum } from "entities/Inventory";

export const fetchBedsData = createAsyncThunk<
  Bed[],
  undefined,
  ThunkConfig<string>
>("beds/fetchBedsData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Bed[]>(`/beds`);

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const harvestBeds = createAsyncThunk<
  undefined,
  { index: number },
  ThunkConfig<string>
>("beds/harvestBeds", async ({ index }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<undefined>("/beds/harvest", {
      index,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const plantBeds = createAsyncThunk<
  undefined,
  { index: number; crop: SeedEnum },
  ThunkConfig<string>
>("beds/plantBeds", async ({ index, crop }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    await extra.api.post<Bed[]>("/beds/plant", { index, crop });

    return;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
