import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { StoreProvider } from "app/providers/StoreProvider";
import App from "./app/App";
import "app/styles/index.scss";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import { AuthProvider } from "app/providers/AuthProvider/ui/AuthProvider";
import { OwnFinanceProvider } from "app/providers/OwnFinanceProvider";

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Контейнер root не найден. НЕ удалось вмонтировать реакт приложение",
  );
}

const root = createRoot(container);

root.render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <OwnFinanceProvider>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </OwnFinanceProvider>
  </BrowserRouter>,
);
