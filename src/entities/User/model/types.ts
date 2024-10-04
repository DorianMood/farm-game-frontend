export interface User {
  id: string;
  username: string;
  ballance?: number;
  createdAt?: string;
  name?: string;
  city?: string;
  rank?: number;
  character?: string;
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

export interface NewUser {
  username: string;
  email: string;
  password: string;
  name: string;
  city: string;
}
