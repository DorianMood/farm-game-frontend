import { useEffect } from "react";
import { OwnFinanceProviderProps } from "./types";
import { initCommunication } from "shared/lib/communication-methods";

export const OwnFinanceProvider = ({ children }: OwnFinanceProviderProps) => {
  useEffect(() => {
    initCommunication();
  }, []);

  return <>{children}</>;
};
