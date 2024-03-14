import classNames from "classnames";
import {memo, ReactNode} from "react";
import {GameHeader} from "widgets/GameLayout/ui/GameHeader";
import {GameMenu} from "widgets/GameLayout/ui/GameMenu";
import {useLocation} from "react-router-dom";
import {gameRoutes} from "widgets/GameLayout/model/items";
import {TaskReminder} from "widgets/TaskReminder";
import {useSelector} from "react-redux";
import cls from "./GameLayout.module.scss";
import {isAuthentificatedSelector} from "entities/User/model/selectors";

interface GameHeaderProps {
  className?: string;
  children: ReactNode;
}

export const GameLayout = memo(({children, className}: GameHeaderProps) => {
  const location = useLocation();
  const isAuthentificated = useSelector(isAuthentificatedSelector);

  if (
    !isAuthentificated ||
    !Object.keys(gameRoutes).includes(location.pathname)
  ) {
    return <>{children}</>;
  }

  return (
    <div className={classNames(cls.GameLayout, {}, [className])}>
      <GameHeader theme={gameRoutes[location.pathname].headerTheme} />
      {children}
      <GameMenu />
      <TaskReminder />
    </div>
  );
});
