import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "entities/User";
import {ThunkConfig} from "app/providers/StoreProvider";
import {AxiosError} from "axios";

interface LoginByUsernameProps {
    login?: string;
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>("login/loginByUsername", async (authData, thunkApi) => {
    const {extra, rejectWithValue} = thunkApi;

    try {
        const response = await extra.api.post<User>("/auth/login", authData);

        if (response instanceof AxiosError) {
            throw response
        }

        return response.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            if (e?.response?.status === 401) {
                return rejectWithValue("Вы ввели неверный логин или пароль");
            }
        }
        return rejectWithValue("Произошла ошибка");
    }
});
