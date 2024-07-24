import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {NewUser} from "entities/User/model/types";
import {AxiosError} from "axios";

interface SignUpProps {
  email: string;
  username: string;
  password: string;
  city: string;
  name: string;
}

export interface SignUpError {
    fields?: {
        [fieldName: string]: string;
    },
    common?: string
}

const ERRORS_MAPPING: Record<string, Exclude<SignUpError, 'common'>> = {
    'Username required': {
        fields: {
            'username': 'Введите имя пользователя'
        }
    },
    'Username must contain at least 5 characters': {
        fields: {
            'username': 'В имени пользователя должно быть минимум 5 символов'
        }
    },
    'Email required': {
        fields: {
            'email': 'Введите email'
        }
    },
    'Email is invalid': {
        fields: {
            'email': 'Введите корректный email'
        }
    },
    'Password required': {
        fields: {
            'password': 'Введите пароль'
        }
    },
    'Password must contain at least 8 characters': {
        fields: {
            'password': 'Пароль должно содержать минимум 8 символов'
        }
    },
};

export const signUp = createAsyncThunk<
    NewUser,
    SignUpProps,
    ThunkConfig<SignUpError>
    >("login/createUser", async (authData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<NewUser>("/users", authData);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e: unknown) {
      let error: SignUpError = {
          common: 'Произошла ошибка'
      };

      if (e instanceof AxiosError) {
          if ((e?.response?.status === 400) && (e.response.data.message in ERRORS_MAPPING)) {
              error = ERRORS_MAPPING?.[e.response.data.message];
          }
      }

      return rejectWithValue(error);
  }
});
