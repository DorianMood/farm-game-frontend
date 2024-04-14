import {useSelector} from "react-redux";
import {memo, useCallback} from "react";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {DynamicModuleLoader, ReducersList,} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {LoginInput} from "shared/ui/LoginInput/LoginInput";
import {useForm} from "../../lib/hooks/useForm";
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {loginByUsername} from "../../model/services/loginByUsername/loginByUsername";
import {loginReducer} from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";

export interface LoginFormProps {
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

export const LoginForm = memo(( {onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const {fields: {username, password}, setters: {onChangeUsername, onChangePassword}} = useForm();

  const onLoginClick = useCallback(async () => {
      const result = await dispatch(
      loginByUsername({ login: username, username, password }),
    );
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  }, [onSuccess, dispatch, password, username]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        {error && (
          <Text
            text={"Вы ввели неверный логин или пароль"}
            theme={TextTheme.ERROR}
          />
        )}
        <LoginInput
          type="text"
          className={cls.input}
          label={"Введите имя"}
          value={username}
          onChange={onChangeUsername}
        />
        <LoginInput
            type="password"
            className={cls.input}
            label={"Введите пароль"}
            value={password}
            onChange={onChangePassword}
        />
        <Button
          theme={ButtonTheme.BACKGROUND_INVERTED}
          className={cls.loginBtn}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {"Войти"}
        </Button>
    </DynamicModuleLoader>
  );
});
