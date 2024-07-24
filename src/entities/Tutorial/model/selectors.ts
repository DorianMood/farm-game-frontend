import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.tutorial;

export const tutorialSelector = createSelector(
  [rootSelector],
  (tasks) => tasks?.steps ?? [],
);

export const currentTutorialSelector = createSelector(
  [rootSelector],
  (tasks) => tasks.currentStep,
);

export const currentTutorialStepIndexSelector = createSelector(
    [rootSelector],
    (tasks) => tasks.currentStepIndex,
);

export const currentTutorialPageSelector = createSelector(
    [rootSelector],
    (tasks) => tasks.currentPage,
);