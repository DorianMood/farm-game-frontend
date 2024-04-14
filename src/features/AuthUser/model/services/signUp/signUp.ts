import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {NewUser} from "entities/User/model/types";

interface SignUpProps {
  email: string;
  username: string;
  password: string;
}

export const signUp = createAsyncThunk<
    NewUser,
    SignUpProps,
    ThunkConfig<string>
    >("login/createUser", async (authData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<NewUser>("/users", authData);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
