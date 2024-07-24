import classNames from "classnames";
import { memo } from "react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./InventoryCard.module.scss";

interface InventoryCardProps {
  className?: string;
  text?: string;
  coinsCount?: number;
  itemsCount?: number;
  onClick?: () => void;
  onSellClick?: () => void;
  image?: React.ReactNode;
}

export const InventoryCard = memo((props: InventoryCardProps) => {
  const {
    text,
    coinsCount,
    itemsCount = 1,
    image,
    onClick,
    onSellClick,
  } = props;

  const handleSellClick = () => {
    onSellClick?.();
  };

  return (
    <div className={classNames(cls.ShopCard)} onClick={onClick}>
      <div className={cls.img}>
        {image ?? <img src={`https://placehold.co/600x400`} />}
      </div>
      <div className={cls.info}>
        {text && (
          <p className={cls.text}>
            {text} {itemsCount} шт.
          </p>
        )}
        {coinsCount && (
          <p className={cls.text}>
            <CoinIcon /> {coinsCount}
          </p>
        )}
        <button className={cls.link} onClick={handleSellClick}>
          Продать
        </button>
      </div>
    </div>
  );
});
