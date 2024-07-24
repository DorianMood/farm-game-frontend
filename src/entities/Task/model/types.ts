export interface TaskDetails {
  id: string;
  cost: number;
  type: "Plant" | "FinanceGenius" | "CustomGame";
}

export interface Task {
  id: string;
  completedAt?: string;
  task: TaskDetails;
}

export interface TasksSchema {
  isLoading: boolean;
  error: boolean;
  data: {
    tasks?: Task[];
  };
}
