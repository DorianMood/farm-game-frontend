import classNames from "classnames";
import {memo, ReactNode} from "react";
import {GameHeader} from "widgets/GameLayout/ui/GameHeader";
import {GameMenu} from "widgets/GameLayout/ui/GameMenu";
import {useLocation} from "react-router-dom";
import {gameRoutes} from "widgets/GameLayout/model/items";
import {useSelector} from "react-redux";
import cls from "./GameLayout.module.scss";
import {isAuthentificatedSelector} from "entities/User/model/selectors";
import {Tutorial} from "./Tutorial";
import {Greeting} from "./Greeting";

interface GameHeaderProps {
    className?: string;
    children: ReactNode;
}

export const GameLayout = memo(({children, className}: GameHeaderProps) => {
    const location = useLocation();

    const isAuthentificated = useSelector(isAuthentificatedSelector);

    const showHeaderAndMenu = isAuthentificated && Object.keys(gameRoutes).includes(location.pathname);
    const showHeader = gameRoutes[location.pathname]?.isVisibleHeader;

    return (
        <div className={classNames(cls.GameLayout, {}, [className])}>
            <Tutorial/>
            {showHeaderAndMenu && showHeader && <GameHeader theme={gameRoutes[location.pathname]?.headerTheme}/>}
            {children}
            {showHeaderAndMenu && <GameMenu/>}
            <Greeting />
        </div>
    );
});
