import { memo, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { isAuthentificatedSelector } from "entities/User/model/selectors";

const AppRouter = () => {
  const isAthentificated = useSelector(isAuthentificatedSelector);

  const routes = useMemo(
    () =>
      Object.values(routeConfig).filter((route) => {
        if (route.authOnly && !isAthentificated) {
          return false;
        }

        return true;
      }),
    [isAthentificated],
  );

  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={<div className="page-wrapper">{element}</div>}
        />
      ))}
    </Routes>
  );
};

export default memo(AppRouter);
