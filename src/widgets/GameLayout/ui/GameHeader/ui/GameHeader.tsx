import { classNames } from "shared/lib/classNames/classNames";
import { useMemo } from "react";
import { StatisticsCard } from "shared/ui/StatisticsCard/StatisticsCard";
import { StatisticsCardType } from "shared/ui/StatisticsCard/types";
import cls from "./GameHeader.module.scss";
import { useSelector } from "react-redux";
import { userSelector } from "entities/User";

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
  const user = useSelector(userSelector);

  const balance = user?.ballance ?? 0;

  const date = useMemo(
    () =>
      user?.createdAt
        ? Math.ceil(
            (new Date().valueOf() - new Date(user?.createdAt).valueOf()) /
              (1000 * 60 * 60 * 24),
          )
        : null,
    [user?.createdAt],
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
