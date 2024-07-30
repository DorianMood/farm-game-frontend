import classNames from "classnames";
import {memo} from "react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./RaitingCard.module.scss";
import ProfileIcon from 'shared/assets/icons/profile-32-32.svg?react';

interface RatingCardProps {
  className?: string;
  name: string;
  city?: string;
  coinsCount: number;
  isCurrent?: boolean;
  rank?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {className, name, city, rank, coinsCount, isCurrent} = props;


  return (
    <div
      className={classNames(
        cls.RatingCard,
        {
          [cls.active]: isCurrent,
        },
        [className]
      )}
    >
      <div className={cls.info}>
        {rank && <p className={cls.rank}>{rank}</p>}
        <ProfileIcon />
        <div>
          <p className={cls.text}>{name}</p>
          {city && <p className={cls.text}>г. {city}</p>}
        </div>
      </div>
      {coinsCount && (
        <div className={cls.coinsCount}>
          <CoinIcon />
          <p className={cls.coinsCountText}>{coinsCount}</p>
        </div>
      )}
    </div>
  );
});
