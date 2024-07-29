import classNames from "classnames";
import { memo } from "react";
import cls from "./ShopCard.module.scss";
import {ModalButton, ModalButtonTheme} from "../ModalButton/ModalButton.tsx";

interface ShopCardProps {
  image?: string;
  className?: string;
  title?: string;
  description?: string;
  background?: string;
  coinsCount?: number;
  href?: string;
  onClick: () => void;
}

export const ShopCard = memo((props: ShopCardProps) => {
  const { title, description, background, coinsCount, href, image, onClick } = props;

  return (
    <div
      className={classNames(cls.ShopCard, { [cls.active]: !!href })}
      onClick={onClick}
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
        <ModalButton
            theme={ModalButtonTheme.BACKGROUND}
            onClick={onClick}
            className={cls.button}
        >
          Купить
        </ModalButton>
          <img className={cls.img} src={image ?? 'https://placehold.co/600x400'}/>
      </div>
    </div>
  );
});
