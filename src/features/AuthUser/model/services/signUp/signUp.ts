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
  character: string;
}

export interface SignUpError {
    fields?: {
        [fieldName: string]: string;
    },
    common?: string
}

const ERRORS_MAPPING: Record<string, Exclude<SignUpError, 'common'>> = {
    'Name required': {
        fields: {
            'name': 'Введите имя пользователя'
        }
    },
    'Character required': {
        fields: {
            'character': 'Выберите пол пользователя'
        }
    },
    'Username required': {
        fields: {
            'username': 'Введите ник пользователя'
        }
    },
    'Username must contain at least 5 characters': {
        fields: {
            'username': 'В нике пользователя должно быть минимум 5 символов'
        }
    },
    'Username already exists': {
        fields: {
            'username': 'Такой ник уже существует'
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
    "Email already exists": {
        fields: {
            'email': 'Данный email уже зарегистрирован'
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
    if (response instanceof AxiosError) {
        throw response
    }
    localStorage.removeItem('hasShownFirstTutorial');

    return response.data;
  } catch (e: unknown) {
      let error: SignUpError = {
          common: 'Произошла ошибка'
      };
      if (e instanceof AxiosError) {
          if ((e?.response?.status.toString().startsWith('4')) && (e.response.data.message in ERRORS_MAPPING)) {
              error = ERRORS_MAPPING?.[e.response.data.message];
          }
      }

      return rejectWithValue(error);
  }
});
