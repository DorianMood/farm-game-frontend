import {memo} from "react";
import classNames from "classnames";
import CoinsIcon from "shared/assets/icons/coins-20-20.svg?react";
import cls from "./ResourcesCard.module.scss";
import {CropEnum} from "entities/Bed/model/types";
import {cropIconMapper} from "./utils";

interface Seed {
  type: CropEnum;
  amount: number;
}

interface ResourcesCardProps {
  className?: string;
  balance: number;
  seeds: Seed[];
}

export const ResourcesCard = memo((props: ResourcesCardProps) => {
  const {className, seeds, balance} = props;

  return (
    <div className={classNames(cls.Card, {}, [className])}>
      <div className={cls.Item}>
        <CoinsIcon />
        <p className={cls.text}>{balance}</p>
      </div>
      {seeds.map((item) => (
        <div className={cls.Item} key={item.type}>
          {cropIconMapper[item.type]}
          <p className={cls.text}>{item.amount}</p>
        </div>
      ))}
    </div>
  );
});
