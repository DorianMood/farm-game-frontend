import {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import classNames from "classnames";
import cls from "./ProfilePage.module.scss";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {LogoutModal} from "features/LogoutUser/ui/LogoutModal/LogoutModal";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Text, TextTheme} from "shared/ui/Text/Text";
import Cat from "shared/assets/images/cat.jpg";

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = ({className}: ProfilePageProps) => {
    const navigate = useNavigate();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onSuccess = useCallback(() => {
        navigate(RoutePath.main);
    }, [navigate]);

  return (
    <div className={classNames(cls.Profile, {}, [className])}>
        <Avatar src={Cat}/>
        <Text
            text={"Иван Иванов"}
            theme={TextTheme.PRIMARY}
        />
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
