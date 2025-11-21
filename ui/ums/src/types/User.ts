export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  statusId: number;
  statusName: string;
  roles?: string;
  permissions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  fullName?: string;
  password: string;
  statusId?: number;
  roles?: string[];
}

export interface UpdateUserRequest {
  email: string;
  fullName?: string;
  statusId: number;
}

