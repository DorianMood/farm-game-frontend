import FarmerGirl from "shared/assets/images/farmer-girl.png";
import FarmerBoy from "shared/assets/images/farmer.png";
import cls from "./Greeting.module.scss";
import {
  ModalButton,
  ModalButtonTheme,
} from "shared/ui/ModalButton/ModalButton.tsx";
import { useSelector } from "react-redux";
import { isAuthentificatedSelector } from "entities/User";
import { useEffect, useState } from "react";
import { tutorialActions } from "entities/Tutorial";
import { AppRoutes } from "shared/config/routeConfig/routeConfig.tsx";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";

export const Greeting = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setOpen] = useState(false);

  const isAuthentificated = useSelector(isAuthentificatedSelector);

  // Устанавливаем признак просмотренности туториала при первом заходе пользователя
  useEffect(() => {
    const hasShownTutorial = localStorage.getItem("hasShownFirstTutorial");
    if (!hasShownTutorial && isAuthentificated) {
      setOpen(true);
    }
  }, [isAuthentificated]);

  const handleBeginButtonClick = () => {
    localStorage.setItem("hasShownFirstTutorial", "true");
    dispatch(tutorialActions.setPageTutorial(AppRoutes.MY_FARM));
    setOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cls.Greeting}>
      <div className={cls.main}>
        <h2 className={cls.title}>
          Добро пожаловать в игру <br /> «Финансовый Фермер»!{" "}
        </h2>
        <p className={cls.text}>
          Игра поможет улучшить финансовую грамотность и научиться принимать
          взвешенные решения, связанные с управлением хозяйством и
          распределением ресурсов.
        </p>
        <p className={cls.text}>
          Вы начинаете с небольшого участка земли, на котором можно засаживать
          грядки и получать урожай. Выращивайте культуры, продавайте их в
          магазине, чтобы заработать деньги.
        </p>
        <p className={cls.text}>
          Ваш богатый дядюшка дал вам стартовый капитал в количестве{" "}
          <b>100 монет</b>, чтобы вы освоили искусство ведения хозяйства. Он верит в вас и знает, что вы добьётесь успеха в
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
      <img
        className={cls.GreetingBoy}
        src={FarmerBoy}
        alt="farmer-boy-helper"
      />
      <img
        className={cls.GreetingGirl}
        src={FarmerGirl}
        alt="farmer-girl-helper"
      />
    </div>
  );
};
