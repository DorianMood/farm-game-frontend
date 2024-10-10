import { Tutorial, TutorialNameEnum } from "./types.ts";

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
      text: 'Добро пожаловать в игру "Финансовый Фермер"!',
      name: TutorialNameEnum.GREETING,
    },
    {
      text: "С каждым днем появляется новое задание!",
      name: TutorialNameEnum.DAYS,
    },
    {
      text: "Выполняйте ежедневные задания и зарабатывайте монеты!",
      name: TutorialNameEnum.TASK,
    },
    {
      text: "За выполнение заданий получайте монетки!",
      name: TutorialNameEnum.BALANCE,
    },
    {
      text: "Чем больше монет, тем выше Ваш рейтинг в игре!",
      name: TutorialNameEnum.RATING,
    },
    {
      text: "Чтобы получить монетки Вы также можете засеять грядки! Приобрести семена можно в магазине",
      name: TutorialNameEnum.ON_PLANT,
    },
    {
      text: "Собирая урожай, получайте новые семена и монетки!",
      name: TutorialNameEnum.ON_HARVEST,
    },
    {
      text: "Собирайте ресурсы с животных! Приобрести животных можно в магазине",
      name: TutorialNameEnum.ON_ANIMAL_HARVEST,
    },
    {
      text: "Приобретайте удобрение в магазине и ускоряйте процесс созревания растительных культур!",
      name: TutorialNameEnum.ON_FERTILIZE,
    },
    {
      text: "Приобретайте витамины для животных в магазине и ускоряйте процесс получения животных ресурсов!",
      name: TutorialNameEnum.ON_VITAMIN,
    },
  ],
  [AppRoutes.MAIN]: [],
  [AppRoutes.ABOUT]: [],
  [AppRoutes.PROFILE]: [],
  [AppRoutes.RATING]: [],
  [AppRoutes.SHOP]: [],
  [AppRoutes.NOT_FOUND]: [],
};

