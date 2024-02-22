import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.products;

export const productsSelector = createSelector(
  [rootSelector],
  (products) => products.data,
);

export const productsIsLoadingSelector = createSelector(
  [rootSelector],
  (products) => products.isLoading,
);

export const productsIsUpdatingSelector = createSelector(
  [rootSelector],
  (products) => products.isUpdating,
);
