import classNames from "classnames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import {GameLayout} from "widgets/GameLayout";

function App() {
  const {theme} = useTheme();

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
