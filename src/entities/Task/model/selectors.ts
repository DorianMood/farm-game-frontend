import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.tasks;

export const tasksSelector = createSelector(
  [rootSelector],
  (tasks) => tasks.data?.tasks,
);

export const tasksIsLoadingSelector = createSelector(
  [rootSelector],
  (tasks) => tasks.isLoading,
);
