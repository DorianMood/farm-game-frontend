import classNames from "classnames";
import { memo } from "react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./ShopCard.module.scss";
import { useNavigate } from "react-router-dom";

interface ShopCardProps {
  className?: string;
  text?: string;
  coinsCount?: number;
  href?: string;
  img: string;
  onClick: () => void;
}

export const ShopCard = memo((props: ShopCardProps) => {
  const { text, coinsCount, href, onClick } = props;

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
        <img src={`https://placehold.co/600x400`} />
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
