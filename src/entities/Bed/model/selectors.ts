import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.beds;

export const bedsSelector = createSelector(
  [rootSelector],
  (beds) => beds.data.beds,
);

export const isLoadingBedsSelector = createSelector(
    [rootSelector],
    (beds) => beds.isLoading,
);
