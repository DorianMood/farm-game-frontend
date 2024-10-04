import {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import classNames from "classnames";
import cls from "./ProfilePage.module.scss";
import {AppRoutes, RoutePath} from "shared/config/routeConfig/routeConfig";
import {LogoutModal} from "features/LogoutUser/ui/LogoutModal/LogoutModal";
import LogoIcon from "shared/assets/icons/logo-47-47.svg?react";
import Farmer from "shared/assets/images/farmer-new.png";
import FarmerGirl from "shared/assets/images/farmer-girl.png";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {tutorialActions} from "entities/Tutorial";
import {useSelector} from "react-redux";
import {userSelector} from "entities/User";
import {isAuthentificatedThunk} from "entities/User/model/thunks.ts";
import MaskImage from "shared/assets/images/mask.svg";
import Image from "shared/assets/images/mask.svg";

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
            <img src={MaskImage} alt="mask" className={cls.mask}/>

            <div className={cls.screen}>
                <header className={cls.header}>
                    <img src={Image} alt="mask" className={cls.mask}/>
                    <div className={cls["logo-badge"]}>
                        <LogoIcon className={cls.image}/>
                        <div className={cls["logo-text"]}>
                            <p className={cls.main}>Я в агро</p>
                            <p className={cls.minor}>От Россельхозбанка</p>
                        </div>
                    </div>
                    <h1 className={cls.heading}>Профиль</h1>
                </header>
                <div className={cls['profile-info']}>
                    <div className={cls.avatar}>
                        {user?.character === 'Female' ?
                            <img src={FarmerGirl} alt="Фермер логотип"/> :
                            <img src={Farmer} className={cls['character-boy']} alt="Фермер логотип"/>
                        }
                    </div>
                    <div className={cls.text}>
                        <p className={cls.name}>
                            {user?.name ?? user?.username}
                        </p>
                        {user?.city && <p className={cls.city}>
                            г. {user.city}
                        </p>}
                    </div>
                </div>
                <button className={cls.button} onClick={onActiveTutorial}>
                    Как играть?
                </button>
                <button className={cls.button} onClick={onShowModal}>
                    Выйти из аккаунта
                </button>
                <LogoutModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                    onSuccess={onSuccess}
                />
            </div>
        </div>
    );
};
