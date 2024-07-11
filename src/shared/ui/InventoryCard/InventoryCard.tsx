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
}

export const InventoryCard = memo((props: InventoryCardProps) => {
  const { text, coinsCount,itemsCount = 1, onClick } = props;

  return (
    <div
      className={classNames(cls.InventoryCard)}
      onClick={onClick}
    >
      <div className={cls.info}>
        {text && <p className={cls.text}>{text} {itemsCount} шт.</p>}
        {coinsCount && (
          <div className={cls.coinsCount}>
            <p className={cls.text}>Цена за шт.</p>
              <CoinIcon />
            <p className={cls.coinsCountText}>{coinsCount}</p>
          </div>
        )}
        <p>Продать</p>
      </div>
    </div>
  );
});
