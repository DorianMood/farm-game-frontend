import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Survey } from "./types";

export const fetchSurveyData = createAsyncThunk<
  Survey,
  string,
  ThunkConfig<string>
>("surveys/fetchSurveyData", async (taskId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Survey>(`/surveys?taskId=${taskId}`);

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
