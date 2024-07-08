import {createSelector} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.animalBarns;

export const animalBarnsSelector = createSelector(
  [rootSelector],
  (animalBarns) => animalBarns.data.animalBarns
);
