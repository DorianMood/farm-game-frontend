import { useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import { useDispatch } from "react-redux";
import { userActions } from "entities/User";
import { GameLayout } from "widgets/GameLayout";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <div className="content-page">
        <GameLayout>
          <AppRouter />
        </GameLayout>
      </div>
    </div>
  );
}

export default App;
