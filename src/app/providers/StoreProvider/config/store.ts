import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { $api } from "shared/api/api";
import { NavigateOptions } from "react-router";
import { CombinedState, Reducer } from "redux";
import { bedsReducer } from "entities/Bed";
import { tasksReducer } from "entities/Task";
import { surveyReducer } from "entities/Survey";
import { productsReducer } from "entities/Products";
import {inventoryReducer} from "entities/Inventory";
import {StateSchema, ThunkExtraArg} from "./StateSchema";
import {createReducerManager} from "./reducerManager";
import {animalBarnsReducer} from "entities/AnimalBarn";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: any, options?: NavigateOptions) => void
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    beds: bedsReducer,
    animalBarns: animalBarnsReducer,
    tasks: tasksReducer,
    survey: surveyReducer,
    products: productsReducer,
    inventory: inventoryReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: import.meta.env.DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
