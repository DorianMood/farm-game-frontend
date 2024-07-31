import classNames from "classnames";
import { memo } from "react";
import cls from "./ShopCard.module.scss";
import {ModalButton, ModalButtonTheme} from "../ModalButton/ModalButton.tsx";
import {useSelector} from "react-redux";
import {userSelector} from "entities/User";
import {formatDate} from "features/FarmGame/PlantModal/utilts.ts";

interface ShopCardProps {
  image?: string;
  className?: string;
  title?: string;
  description?: string;
  background?: string;
  coinsCount?: number;
  href?: string;
  harvestTimeout?: number;
  onClick: () => void;
}

export const ShopCard = memo((props: ShopCardProps) => {
  const { title, description, background, coinsCount,harvestTimeout,  href, image, onClick } = props;
  const user = useSelector(userSelector);

  const isButtonDisabled = (user?.ballance ?? 0) < (coinsCount ?? 0)

  return (
    <div
      className={classNames(cls.ShopCard, { [cls.active]: !!href })}
      style={{background: background}}
    >
      <div className={cls.info}>
        {title && <h3 className={cls.title}>{title}</h3>}
        {description && <p className={cls.description}>{description}</p>}
        {coinsCount && (
            <div className={cls.coinsCount}>
              <p className={cls.coinsCountText}>Цена {coinsCount} монет</p>
            </div>
        )}
        {harvestTimeout && (
            <div className={cls.coinsCount}>
              <p className={cls.coinsCountText}>Время созревания {formatDate(harvestTimeout)}</p>
            </div>
      )}
      <ModalButton
            theme={ModalButtonTheme.BACKGROUND}
            onClick={onClick}
            className={cls.button}
            disabled={isButtonDisabled}
        >
          Купить
        </ModalButton>
        <img className={cls.img} src={image ?? 'https://placehold.co/600x400'}/>
      </div>
    </div>
  );
});
