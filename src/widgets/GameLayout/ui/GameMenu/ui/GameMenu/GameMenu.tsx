import { useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import { GameMenuItem } from "widgets/GameLayout/ui/GameMenu/ui/GameMenuItem/GameMenuItem";
import cls from "./GameMenu.module.scss";
import { MenuItemsList } from "../../model/items";
import {useSelector} from "react-redux";
import {currentTutorialSelector} from "entities/Tutorial/model/selectors.ts";

export const GameMenu = memo(() => {
  const location = useLocation();

  const currentTutorial = useSelector(currentTutorialSelector);

  const itemsList = useMemo(
    () =>
      MenuItemsList.map((item) => (
        <GameMenuItem
          item={item}
          key={item.path}
          isActive={location.pathname === item.path}
          className={currentTutorial !== undefined ? cls.tutorialMode : ""}
        />
      )),
    [location.pathname, currentTutorial],
  );

  return (
    <div data-testid="menu" className={cls.Menu}>
      <div className={cls.items}>{itemsList}</div>
    </div>
  );
});
