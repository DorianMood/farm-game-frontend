import classNames from "classnames";
import {memo, ReactNode, useEffect} from "react";
import {GameHeader} from "widgets/GameLayout/ui/GameHeader";
import {GameMenu} from "widgets/GameLayout/ui/GameMenu";
import {useLocation, useNavigate} from "react-router-dom";
import {gameRoutes} from "widgets/GameLayout/model/items";
import {useSelector} from "react-redux";
import cls from "./GameLayout.module.scss";
import {isAuthentificatedSelector} from "entities/User/model/selectors";
import {Tutorial} from "./Tutorial";
import {tutorialActions} from "entities/Tutorial";
import {AppRoutes, RoutePath} from "shared/config/routeConfig/routeConfig.tsx";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";

interface GameHeaderProps {
    className?: string;
    children: ReactNode;
}

export const GameLayout = memo(({children, className}: GameHeaderProps) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthentificated = useSelector(isAuthentificatedSelector);

    const showHeaderAndMenu = isAuthentificated && Object.keys(gameRoutes).includes(location.pathname);

    // Устанавливаем признак просмотренности туториала при первом заходе пользователя
    useEffect(() => {
        const hasShownTutorial = localStorage.getItem('hasShownFirstTutorial');
        if (!hasShownTutorial) {
            dispatch(tutorialActions.setPageTutorial(AppRoutes.MY_FARM));
            localStorage.setItem('hasShownFirstTutorial', 'true');
            navigate(RoutePath.farm);
        }
    }, []);

    return (
        <div className={classNames(cls.GameLayout, {}, [className])}>
            <Tutorial/>
            {showHeaderAndMenu && <GameHeader theme={gameRoutes[location.pathname]?.headerTheme}/>}
            {children}
            {showHeaderAndMenu && <GameMenu/>}
        </div>
    );
});
