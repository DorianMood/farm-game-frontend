import FarmerGirl from "shared/assets/images/farmer-girl.png";
import FarmerBoy from "shared/assets/images/farmer.png";
import cls from "./Greeting.module.scss";
import {ModalButton, ModalButtonTheme} from "shared/ui/ModalButton/ModalButton.tsx";
import {useSelector} from "react-redux";
import {isAuthentificatedSelector, userSelector} from "entities/User";
import {useEffect, useState} from "react";
import {tutorialActions} from "entities/Tutorial";
import {AppRoutes} from "shared/config/routeConfig/routeConfig.tsx";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";


export const Greeting = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setOpen] = useState(false);

    const isAuthentificated = useSelector(isAuthentificatedSelector);
    const user = useSelector(userSelector);

    // Устанавливаем признак просмотренности туториала при первом заходе пользователя
    useEffect(() => {
        if (!user?.id) {
            return
        }
        const hasShownFirstTutorial = localStorage.getItem(user?.id);

        if ((hasShownFirstTutorial !== 'hasShownFirstTutorial') && isAuthentificated) {
            setOpen(true);
        }
    }, [isAuthentificated, user?.id]);

    const handleBeginButtonClick = () => {
        if (user?.id) {
            localStorage.setItem(user?.id, 'hasShownFirstTutorial');
        }
        dispatch(tutorialActions.setPageTutorial(AppRoutes.MY_FARM));
        setOpen(false);
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className={cls.Greeting}>
            <div className={cls.main}>
                <h2 className={cls.title}>Добро пожаловать в игру <br /> «Финансовый Фермер»! </h2>
                <p className={cls.text}>
                    Игра поможет улучшить финансовую грамотность и научиться принимать взвешенные решения, связанные с управлением хозяйством
                    и распределением ресурсов.
                </p>
                <p className={cls.text}>
                    Вы начинаете с небольшого участка земли, на котором можно засаживать грядки и получать урожай.
                    Выращивайте культуры, продавайте их в магазине, чтобы заработать деньги.
                </p>
                <p className={cls.text}>
                    Ваш богатый дядюшка дал вам стартовый капитал в количестве <b>100 монет</b>. Он верит в вас и знает, что вы добьётесь успеха в
                    этой игре!
                </p>
                <ModalButton
                    theme={ModalButtonTheme.BACKGROUND}
                    onClick={handleBeginButtonClick}
                    className={cls.button}
                >
                    Начать
                </ModalButton>
            </div>
            <div className={cls.images}>
                <img src={FarmerBoy} alt="farmer-boy-helper"/>
                <img src={FarmerGirl} alt="farmer-girl-helper"/>
            </div>
        </div>
    );
};
