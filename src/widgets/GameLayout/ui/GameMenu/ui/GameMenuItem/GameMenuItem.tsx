import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { memo } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import cls from "./MenuItem.module.scss";
import {SidebarItemType} from "../../model/items";
import {isAuthentificatedSelector} from "entities/User/model/selectors";

interface GameMenuItemProps {
  item: SidebarItemType;
  isActive: boolean;
  className?: string;
}

export const GameMenuItem = memo(({item, isActive, className}: GameMenuItemProps) => {
  const isAuth = useSelector(isAuthentificatedSelector);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, {
        [cls.active]: isActive,
      }, className)}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{item.text}</span>
    </AppLink>
  );
});
