import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {RatingResponse} from "./types.ts";

export const fetchRatingData = createAsyncThunk<
  RatingResponse,
  undefined,
  ThunkConfig<string>
>("user/fetchUserData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<RatingResponse>(`/users/rating`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});