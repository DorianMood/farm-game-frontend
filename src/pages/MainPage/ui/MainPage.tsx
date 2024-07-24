import { useCallback, useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import Farmer from "shared/assets/images/farmer.png";
import { MainPageHeader } from "pages/MainPage/ui/MainPageHeader/MainPageHeader";
import { AuthModal } from "features/AuthUser";
import { useNavigate } from "react-router-dom";
import {AppRoutes, RoutePath} from "shared/config/routeConfig/routeConfig";
import Rays from "shared/assets/images/rays.png";
import cls from "./MainPage.module.scss";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {tutorialActions} from "../../../entities/Tutorial";

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onSuccess = useCallback(() => {
    navigate(RoutePath.farm);
  }, [navigate]);

  const onOpenTutorial = useCallback(() => {
      dispatch(tutorialActions.setPageTutorial(AppRoutes.MY_FARM));
      navigate(RoutePath.farm);
  }, [dispatch, navigate]);

  return (
    <div className={cls.MainPage}>
      <MainPageHeader />
      <div className={cls["game-logo"]}>
        <div className={cls.rays} style={{ backgroundImage: `url(${Rays})` }} />
        <h1 className={cls["game-logo-title"]} translate="no">
          <span data-text="Финансовый">Финансовый</span>
          <span data-text="фермер">фермер</span>
        </h1>
      </div>
      <div className={cls.buttons}>
        <Button theme={ButtonTheme.BACKGROUND} onClick={onShowModal}>
          {"Войти на ферму"}
        </Button>
        <Button theme={ButtonTheme.OUTLINE} onClick={onOpenTutorial}>
          {"Как играть"}
        </Button>
      </div>
      <img src={Farmer} alt="farmer-logo" />
      <AuthModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
        onSuccess={onSuccess}
      />
    </div>
  );
};
