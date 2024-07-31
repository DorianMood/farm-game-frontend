import {AppRoutes} from "shared/config/routeConfig/routeConfig.tsx";

export enum TutorialNameEnum {
  GREETING,
  ON_HARVEST,
  BALANCE,
  DAYS,
  RATING,
  ON_PLANT,
  ON_ANIMAL_HARVEST,
  ON_FERTILIZE
}
export interface Tutorial {
  name: TutorialNameEnum;
  text: string;
}

export interface TutorialSchema {
  steps?: Tutorial[],
  currentStep?: TutorialNameEnum;
  currentStepIndex: number;
  currentPage?: AppRoutes;
}