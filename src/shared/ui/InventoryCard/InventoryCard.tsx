import classNames from "classnames";
import { memo } from "react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./InventoryCard.module.scss";
import { Button } from "../Button/Button";

interface InventoryCardProps {
  className?: string;
  text?: string;
  coinsCount?: number;
  itemsCount?: number;
  onClick?: () => void;
  onSellClick?: () => void;
}

export const InventoryCard = memo((props: InventoryCardProps) => {
  const { text, coinsCount, itemsCount = 1, onClick, onSellClick } = props;

  const handleSellClick = () => {
    onSellClick?.();
  };

  return (
    <div className={classNames(cls.InventoryCard)} onClick={onClick}>
      <div className={cls.info}>
        {text && (
          <p className={cls.text}>
            {text} {itemsCount} шт.
          </p>
        )}
        {coinsCount && (
          <div className={cls.coinsCount}>
            <p className={cls.text}>Цена за шт.</p>
            <CoinIcon />
            <p className={cls.coinsCountText}>{coinsCount}</p>
          </div>
        )}
        <Button className={cls.button} onClick={handleSellClick}>
          Продать
        </Button>
      </div>
    </div>
  );
});
