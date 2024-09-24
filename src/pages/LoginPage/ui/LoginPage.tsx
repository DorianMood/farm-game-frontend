import { useCallback, useState } from "react";
import cn from "classnames";
import Farmer from "shared/assets/images/farmer-new.png";
import Image from "shared/assets/images/mask.svg";
import Hen from "shared/assets/images/inventory/small-hen-animal.png";
import Products from "shared/assets/images/products.png";
import Beet from "shared/assets/images/beet.png";
import LogoIcon from "shared/assets/icons/logo-47-47.svg?react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import { AuthModal } from "features/AuthUser";
import { isAuthentificatedThunk } from "entities/User/model/thunks.ts";
import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onSuccess = useCallback(() => {
    dispatch(isAuthentificatedThunk());
  }, [dispatch]);

  return (
    <div className={cls.root}>
      <img src={Image} alt="mask" className={cls.mask} />

      <div className={cls.screen}>
        <header className={cls.header}>
          <img src={Image} alt="mask" className={cls.mask} />
          <img src={Farmer} className={cls.character} alt="Фермер логотип" />
          <div className={cls["logo-badge"]}>
            <LogoIcon className={cls.image} />
            <div className={cls["logo-text"]}>
              <p className={cls.main}>Я в агро</p>
              <p className={cls.minor}>От Россельхозбанка</p>
            </div>
          </div>
          <h1 className={cls.heading}>Финансовый фермер</h1>
        </header>

        <div className={cls.new}>
          <h3>Научись новому</h3>
          <div className={cls.grid}>
            <div className={cls.farmer}>
              <img
                src={Products}
                className={cls.illustration}
                alt="Продукты фермы"
              />
              <p>Что делают фермеры</p>
            </div>
            <div className={cls.crops}>
              <img src={Image} alt="mask" className={cls.mask} />
              <img
                src={Beet}
                className={cn(cls.illustration, cls.beet)}
                alt="Растения фермы"
              />
              <p>Какие бывают агрокультуры</p>
            </div>
            <div className={cls.animals}>
              <img
                src={Hen}
                className={cls.illustration}
                alt="Животные фермы"
              />
              <p>Кто живет на ферме</p>
            </div>
          </div>
        </div>

        <form className={cls.form}>
          <button className={cls.play} onClick={onShowModal} type="button">
            Играть
          </button>
        </form>
      </div>

      <AuthModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
        onSuccess={onSuccess}
      />
    </div>
  );
};
