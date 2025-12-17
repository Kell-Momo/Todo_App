import { Task } from './todo.model';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}