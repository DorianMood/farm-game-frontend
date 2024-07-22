import classNames from "classnames";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./ShopCard.module.scss";

interface ShopCardProps {
  image?: React.ReactNode;
  className?: string;
  text?: string;
  coinsCount?: number;
  href?: string;
  onClick: () => void;
}

export const ShopCard = memo((props: ShopCardProps) => {
  const { text, coinsCount, href, image, onClick } = props;

  const navigate = useNavigate();

  const handleLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (href) {
      navigate(href);
    }
  };

  return (
    <div
      className={classNames(cls.ShopCard, { [cls.active]: !!href })}
      onClick={onClick}
    >
      <div className={cls.img}>
        {image ?? <img src={`https://placehold.co/600x400`} />}
      </div>
      <div className={cls.info}>
        {text && <p className={cls.text}>{text}</p>}
        {coinsCount && !href ? (
          <div className={cls.coinsCount}>
            <CoinIcon />
            <p className={cls.coinsCountText}>{coinsCount}</p>
          </div>
        ) : (
          <button className={cls.link} onClick={handleLinkClick}>
            Подробнее
          </button>
        )}
      </div>
    </div>
  );
});
