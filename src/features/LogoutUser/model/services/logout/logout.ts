import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";

export const logout = createAsyncThunk<
    any,
    undefined,
    ThunkConfig<string>
    >("login/loginByUsername", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post("/auth/logout");

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
