import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { User } from "entities/User";

export const fetchUserData = createAsyncThunk<
  User,
  undefined,
  ThunkConfig<string>
>("user/fetchUserData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<User>(`/users`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const isAuthentificatedThunk = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig<string>
>("login/isAuthentificated", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<boolean>("/auth/authenticated");
    console.log(response.data);

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
