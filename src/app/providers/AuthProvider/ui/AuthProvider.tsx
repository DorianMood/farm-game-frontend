import { useEffect } from "react";
import { AuthProviderProps } from "./types";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  isAuthentificatedSelector,
  isUserLoadingSelector,
} from "entities/User/model/selectors";
import { isAuthentificatedThunk } from "entities/User/model/thunks";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isLoading = useSelector(isUserLoadingSelector);
  const isAuthenticated = useSelector(isAuthentificatedSelector);

  useEffect(() => {
    isAuthenticated === null && dispatch(isAuthentificatedThunk());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const shouldRedirect =
      isAuthenticated !== null &&
      !isLoading &&
      !isAuthenticated &&
      location.pathname !== RoutePath.main;

    if (shouldRedirect) {
      navigate(RoutePath.main);
    }
  }, [isLoading, isAuthenticated, location, navigate]);

  return <>{isLoading ? <PageLoader /> : children}</>;
};
