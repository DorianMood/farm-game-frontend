import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { GameHeaderTheme } from "widgets/GameLayout/ui/GameHeader/ui/GameHeader";

export const gameRoutes = {
  [RoutePath.rating]: {
    route: RoutePath.rating,
    headerTheme: GameHeaderTheme.LIGHT,
    isVisibleHeader: true,
  },
  [RoutePath.shop]: {
    route: RoutePath.shop,
    headerTheme: GameHeaderTheme.LIGHT,
    isVisibleHeader: true,
  },
  [RoutePath.farm]: {
    route: RoutePath.farm,
    headerTheme: GameHeaderTheme.GREEN,
    isVisibleHeader: true,
  },
  [RoutePath.profile]: {
    route: RoutePath.profile,
    headerTheme: GameHeaderTheme.LIGHT,
    isVisibleHeader: false,
  },
};
