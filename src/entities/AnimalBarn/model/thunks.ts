import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {AnimalBarn} from "./types";
import {AnimalEnum} from "entities/Inventory";

export const fetchAnimalBarns = createAsyncThunk<
  AnimalBarn[],
  undefined,
  ThunkConfig<string>
>("animalBarns/fetchAnimalBarns", async (_, thunkApi) => {
  const {extra, rejectWithValue} = thunkApi;

  try {
    const response = await extra.api.get<AnimalBarn[]>(`/barns`);

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const harvestAnimals = createAsyncThunk<
  string,
  {animal: AnimalEnum},
  ThunkConfig<string>
>("animalBarns/harvestAnimals", async ({animal}, thunkApi) => {
  const {extra, rejectWithValue} = thunkApi;

  try {
    const response = await extra.api.post<string>("/barns/harvest", {
      animal,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const startAnimals = createAsyncThunk<
  undefined,
  {animal: AnimalBarn},
  ThunkConfig<string>
>("animalBarns/startAnimals", async ({animal}, thunkApi) => {
  const {extra, rejectWithValue} = thunkApi;

  try {
    await extra.api.post<AnimalBarn[]>("/animals/start", animal);

    return;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
