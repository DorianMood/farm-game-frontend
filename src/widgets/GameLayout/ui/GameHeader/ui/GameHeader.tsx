import { classNames } from "shared/lib/classNames/classNames";
import { useMemo } from "react";
import { StatisticsCard } from "shared/ui/StatisticsCard/StatisticsCard";
import { StatisticsCardType } from "shared/ui/StatisticsCard/types";
import cls from "./GameHeader.module.scss";

export enum GameHeaderTheme {
  LIGHT = "light",
  GREEN = "green",
}

interface GameHeaderProps {
  theme: GameHeaderTheme;
  className?: string;
}

// TODO: Добавить здесь вызовы, подцепить к беку
export const GameHeader = ({ theme, className }: GameHeaderProps) => {
  const balance = 1337;

  const date = useMemo(
    () =>
      Math.ceil(
        (new Date().valueOf() - new Date("01.01.1997").valueOf()) /
          (1000 * 60 * 60 * 24),
      ),
    [],
  );

  return (
    <div className={classNames(cls.GameHeader, {}, [className])}>
      <div className={cls.content}>
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.COINS}
          text={`${balance ?? ""}`}
        />
      </div>
      <div className={cls.content}>
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.DAYS}
          text={date ? `День ${date}` : ""}
        />
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.RATING}
          text="10"
        />
      </div>
    </div>
  );
};
