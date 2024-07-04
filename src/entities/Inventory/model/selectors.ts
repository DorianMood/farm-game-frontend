import {createSelector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.inventory;

export const inventorySelector = createSelector(
  [rootSelector],
  (inventory) => inventory.data.inventory
);
