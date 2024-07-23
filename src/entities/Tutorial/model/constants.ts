import {AppRoutes} from "../../../shared/config/routeConfig/routeConfig.tsx";
import {Tutorial, TutorialNameEnum} from "./types.ts";

export const TUTORIAL_STEPS: Record<AppRoutes, Tutorial[] | undefined> = {
    [AppRoutes.MAIN]: undefined,
    [AppRoutes.ABOUT]: undefined,
    [AppRoutes.PROFILE]: undefined,
    [AppRoutes.MY_FARM]: [
        {
            text: 'Добро пожаловать в нашу игру!',
            name: TutorialNameEnum.GREETING
        },
        {
            text: 'С каждым днем появляется новое задание!',
            name: TutorialNameEnum.DAYS
        },
        {
            text: 'За выполнение заданий получаем монетки',
            name: TutorialNameEnum.BALANCE
        },
        {
            text: 'За выполнение заданий улучшаем рейтинг',
            name: TutorialNameEnum.RATING
        },
        {
            text: 'Сейте урожай!',
            name: TutorialNameEnum.ON_PLANT
        },
        {
            text: 'Собирайте урожай',
            name: TutorialNameEnum.ON_HARVEST
        },
    ],
    [AppRoutes.RATING]: undefined,
    [AppRoutes.SHOP]: undefined,
    [AppRoutes.NOT_FOUND]: undefined,
}