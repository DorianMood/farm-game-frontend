import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.rating;

export const ratingSelector = createSelector(
  [rootSelector],
  (rating) => rating.data,
);

export const isRatingLoadingSelector = createSelector(
  [rootSelector],
  (rating) => rating.isLoading,
);