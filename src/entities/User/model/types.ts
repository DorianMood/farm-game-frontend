export interface User {
  id: string;
  username: string;
  ballance?: number;
  createdAt?: string;
}

export interface UserSchema {
  data?: User;
  // TODO: need to separate this from user
  isAuthentificated: {
    data: boolean | null;
    isLoading: boolean;
    error: boolean;
  };
  isLoading: boolean;
  error: boolean;
}
