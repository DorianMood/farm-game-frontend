import { UserSchema } from "entities/User";
import { LoginSchema, SignUpSchema } from "features/AuthUser";
import { LogoutSchema } from "features/LogoutUser";
import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import {CombinedState} from "redux";
import { AxiosInstance } from "axios";
import { NavigateOptions } from "react-router";
import { BedsSchema } from "entities/Bed";
import { TasksSchema } from "entities/Task";
import { SurveysSchema } from "entities/Survey";
import { ProductsSchema } from "entities/Products";
import {InventorySchema} from "entities/Inventory";
import {AnimalBarnSchema} from "entities/AnimalBarn";
import {TutorialSchema} from "entities/Tutorial";

export interface StateSchema {
  user: UserSchema;
  beds: BedsSchema;
  animalBarns: AnimalBarnSchema;
  tasks: TasksSchema;
  survey: SurveysSchema;
  products: ProductsSchema;
  inventory: InventorySchema;
  tutorial: TutorialSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  signUpForm?: SignUpSchema;
  logoutForm?: LogoutSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: any, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
