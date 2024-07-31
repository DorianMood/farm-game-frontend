import {memo} from "react";
import {cardTypeIconMapper} from "shared/ui/StatisticsCard/items";
import classNames from "classnames";
import cls from "./StatisticsCard.module.scss";
import {StatisticsCardType} from "./types";

interface StatisticsCardProps {
  className?: string;
  cardType: StatisticsCardType;
  text?: string;
  onClick?: () => void;
}

export const StatisticsCard = memo((props: StatisticsCardProps) => {
  const {className, cardType, text, onClick} = props;

  const Icon = cardTypeIconMapper[cardType];

  return (
    <div className={classNames(cls.Card, {[cls.clicked]: !!onClick}, [className])} onClick={onClick}>
      <Icon />
      {!!text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
