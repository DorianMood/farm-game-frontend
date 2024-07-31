import {useSelector} from "react-redux";
import {memo, useCallback} from "react";
import {DynamicModuleLoader, ReducersList,} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Text} from "shared/ui/Text/Text";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getLogoutIsLoading} from "../../model/selectors/getLogoutIsLoading/getLogoutIsLoading";
//import {getLogoutError} from "../../model/selectors/getLogoutError/getLogoutError";
import {logoutReducer} from "../../model/slice/logoutSlice";
import {logout} from "../../model/services/logout/logout";
import cls from "./LogoutForm.module.scss";

export interface LogoutFormProps {
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    logoutForm: logoutReducer,
};

export const LogoutForm = memo(({onSuccess}: LogoutFormProps) => {
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getLogoutIsLoading);
    //const error = useSelector(getLogoutError);

    const onLogoutClick = useCallback(async () => {
        const result = await dispatch(
            logout()
        );
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
        }
    }, [onSuccess, dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={cls.LogoutForm}>
                <Text className={cls.title} text={"Вы уверены, что хотите выйти из игры?"}/>
                <Button
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    className={cls.logoutBtn}
                    onClick={onLogoutClick}
                    disabled={isLoading}
                >
                    Выйти
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
