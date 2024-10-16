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
import {CharacterRadioButton} from "./ui/CharacterRadioButton.tsx";

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

    const {fields: {username, name, email, password, city, character}, setters: {onChangeUsername, onChangeName, onChangeEmail, onChangePassword, onChangeCity, onChangeCharacter}} = useForm();

    const onRegisterClick = async () => {
        const result = await dispatch(
            signUp({username, email, password, city, name, character })
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
                <CharacterRadioButton onChange={onChangeCharacter}/>
                <LoginInput
                    type="text"
                    className={cls.input}
                    label={"Введите имя пользователя"}
                    value={name}
                    onChange={onChangeName}
                    error={!!error?.fields?.name}
                    hint={error?.fields?.name}
                />
                <LoginInput
                    type="text"
                    className={cls.input}
                    label={"Введите ник пользователя"}
                    value={username}
                    onChange={onChangeUsername}
                    error={!!error?.fields?.username}
                    hint={error?.fields?.username}
                />
                <LoginInput
                    type="text"
                    className={cls.input}
                    label={"Введите город"}
                    value={city}
                    onChange={onChangeCity}
                    error={!!error?.fields?.city}
                    hint={error?.fields?.city}
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
