import {Tutorial, TutorialNameEnum} from "./types.ts";

enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    MY_FARM = "farm",
    RATING = "rating",
    SHOP = "shop",
    // last
    NOT_FOUND = "not_found",
}

export const TUTORIAL_STEPS: Record<AppRoutes, Tutorial[] | undefined> = {
    [AppRoutes.MY_FARM]: [
        {
            text: 'Добро пожаловать в игру "Свой Фермер"!',
            name: TutorialNameEnum.GREETING
        },
        {
            text: 'С каждым днем появляется новое задание!',
            name: TutorialNameEnum.DAYS
        },
        {
            text: 'За выполнение заданий получайте монетки!',
            name: TutorialNameEnum.BALANCE
        },
        {
            text: 'Чем больше монет, тем выше Ваш рейтинг в игре!',
            name: TutorialNameEnum.RATING
        },
        {
            text: 'Чтобы получить монетки Вы также можете засеять грядки! Приобресети семена можно в магазине',
            name: TutorialNameEnum.ON_PLANT
        },
        {
            text: 'Собирая урожай, получайте новые семена и монетки!',
            name: TutorialNameEnum.ON_HARVEST
        },
        {
            text: "Собирайте продукты с животных! Приобрести животных можно в магазине",
            name: TutorialNameEnum.ON_ANIMAL_HARVEST
        }
    ],
    [AppRoutes.MAIN]: [],
    [AppRoutes.ABOUT]: [],
    [AppRoutes.PROFILE]: [],
    [AppRoutes.RATING]: [],
    [AppRoutes.SHOP]: [],
    [AppRoutes.NOT_FOUND]: [],
}