import {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import classNames from "classnames";
import cls from "./ProfilePage.module.scss";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {AppRoutes, RoutePath} from "shared/config/routeConfig/routeConfig";
import {LogoutModal} from "features/LogoutUser/ui/LogoutModal/LogoutModal";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Text, TextTheme} from "shared/ui/Text/Text";
import Farmer from "shared/assets/images/farmer.png";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {tutorialActions} from "entities/Tutorial";
import {useSelector} from "react-redux";
import {userSelector} from "entities/User";
import {isAuthentificatedThunk} from "entities/User/model/thunks.ts";

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = ({className}: ProfilePageProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useSelector(userSelector);

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onSuccess = useCallback(() => {
        dispatch(isAuthentificatedThunk());
    }, [navigate]);

    const onActiveTutorial = () => {
        dispatch(tutorialActions.setPageTutorial(AppRoutes.MY_FARM));
        navigate(RoutePath.farm);
    }

  return (
    <div className={classNames(cls.Profile, {}, [className])}>
        <Avatar src={Farmer}/>
        <Text
            text={user?.name ?? user?.username}
            theme={TextTheme.PRIMARY}
        />
        {user?.city && <Text
            text={`г. ${user.city}`}
            theme={TextTheme.PRIMARY}
        />}
        <Button theme={ButtonTheme.OUTLINE} onClick={onActiveTutorial}>
            {"Как играть?"}
        </Button>
        <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>
            {"Выйти"}
        </Button>
        <LogoutModal
            isOpen={isAuthModal}
            onClose={onCloseModal}
            onSuccess={onSuccess}
        />
    </div>
  );
};
