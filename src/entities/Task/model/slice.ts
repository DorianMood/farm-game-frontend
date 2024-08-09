import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksSchema, Task } from "./types";
import { completeTask, fetchTasksData } from "./thunks";

const initialState: TasksSchema = {
  isLoading: false,
  error: false,
  data: {
    tasks: undefined,
  },
  isOpenTaskModal: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initTasksData: (state) => {
      state.data.tasks = [];
    },
    resetFinanceGeniusData: (state) => {
      state.data.tasks = state.data.tasks?.filter((task) => task?.task?.type !== "FinanceGenius")
    },
    setTasksData: (state, action: PayloadAction<Task[]>) => {
      state.data.tasks = action.payload;
    },
    resetTasksDate: (state) => {
      state.data.tasks = [];
    },
    setOpenTaskModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenTaskModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksData.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(
        fetchTasksData.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.isLoading = false;
          state.data.tasks = action.payload;
        },
      )
      .addCase(fetchTasksData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(completeTask.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(
        completeTask.fulfilled,
        (state) => {
          state.isLoading = false;
        },
      )
      .addCase(completeTask.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: tasksActions } = tasksSlice;
export const { reducer: tasksReducer } = tasksSlice;
