import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.user;

export const isAuthentificatedSelector = createSelector(
  [rootSelector],
  (user) => user.isAuthentificated.data,
);

export const isUserLoadingSelector = createSelector(
  [rootSelector],
  (user) => user.isAuthentificated.isLoading,
);
