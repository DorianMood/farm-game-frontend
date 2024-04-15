import classNames from "classnames";
import {useSelector} from "react-redux";
import {memo} from "react";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {LoginInput} from "shared/ui/LoginInput/LoginInput";
import {signUp} from "../../model/services/signUp/signUp";
import {useForm} from "../../lib/hooks/useForm";
import {getSignUpIsLoading} from "../../model/selectors/getSignUpIsLoading/getSignUpIsLoading";
import {getSignUpError} from "../../model/selectors/getSignUpError/getSignUpError";
import {signUpReducer} from "../../model/slice/signUpSlice";
import cls from "./SignUpForm.module.scss";
import {Text, TextTheme} from "../../../../shared/ui/Text/Text";

export interface SignUpFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    signUpForm: signUpReducer,
};

export const SignUpForm = memo(({className, onSuccess}: SignUpFormProps) => {
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getSignUpIsLoading);
    //TODO: Добавить синхронную с бэком валидацию
    const error = useSelector(getSignUpError);

    const {fields: {username, email, password}, setters: {onChangeUsername, onChangeEmail, onChangePassword}} = useForm();

    const onRegisterClick = async () => {
        const result = await dispatch(
            signUp({username, email, password})
        );
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
        }
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                {error?.common && (
                    <Text
                        text={error?.common}
                        theme={TextTheme.ERROR}
                    />
                )}
                <LoginInput
                    type="text"
                    className={cls.input}
                    label={"Введите имя"}
                    value={username}
                    onChange={onChangeUsername}
                    error={!!error?.fields?.username}
                    hint={error?.fields?.username}
                />
                <LoginInput
                    type="email"
                    className={cls.input}
                    label={"Введите email"}
                    value={email}
                    onChange={onChangeEmail}
                    error={!!error?.fields?.email}
                    hint={error?.fields?.email}
                />
                <LoginInput
                    type="password"
                    className={cls.input}
                    label={"Введите пароль"}
                    value={password}
                    onChange={onChangePassword}
                    error={!!error?.fields?.password}
                    hint={error?.fields?.password}
                />
                <Button
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    className={cls.loginBtn}
                    onClick={onRegisterClick}
                    disabled={isLoading}
                >
                    {"Зарегистрироваться"}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
