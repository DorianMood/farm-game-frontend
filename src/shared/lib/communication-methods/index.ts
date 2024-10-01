import { ModuleObserver } from "../module-observer";
import { MODULE_ID } from "./constants";

const communicationMethods = (function () {
  const moduleObserver: ModuleObserver = ModuleObserver.getInstance();
  const initCommunication = () => {
    moduleObserver.sendRequestToParent(MODULE_ID, "initialization", "init");
  };

  const goBack = () => {
    moduleObserver.sendRequestToParent(MODULE_ID, "navigation", "pop");
  };

  return {
    goBack,
    initCommunication,
  };
})();

export const { goBack, initCommunication } = communicationMethods;
