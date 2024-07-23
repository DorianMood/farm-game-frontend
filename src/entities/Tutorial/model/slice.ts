import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorialSchema} from "./types";
import {TUTORIAL_STEPS} from "./constants.ts";
import {AppRoutes} from "../../../shared/config/routeConfig/routeConfig.tsx";

const initialState: TutorialSchema = {
  steps: undefined,
  currentStepIndex: 0,
  currentStep: undefined,
};

export const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setPageTutorial: (state, action: PayloadAction<AppRoutes>) => {
      state.steps = TUTORIAL_STEPS[action.payload];
      state.currentStepIndex = 0;
      state.currentStep = TUTORIAL_STEPS?.[action.payload]?.[0].name;
    },
    setCurrentStepIndex: (state, action: PayloadAction<number>) => {
      state.currentStepIndex = action.payload;
      state.currentStep = state?.steps?.[action.payload].name;
    },
    closeTutorial: (state) => {
      state.currentStep = undefined;
      state.currentStepIndex = 0;
    },
  },
  extraReducers: () => {},
});

// Action creators are generated for each case reducer function
export const { actions: tutorialActions } = tutorialSlice;
export const { reducer: tutorialReducer } = tutorialSlice;
