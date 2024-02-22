import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

const rootSelector = (state: StateSchema) => state.survey;

export const surveySelector = createSelector(
  [rootSelector],
  (survey) => survey.data.survey,
);
