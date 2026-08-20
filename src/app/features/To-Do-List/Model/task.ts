export interface Task {
  id?: number,
  title: string,
  description?: string,
  is_completed: boolean,
  due_at?: string,
  created_at?: string,
  updated_at?: string,
}

export interface APIRes<T = Task> {
  success: boolean;
  message?: string; 
  data: T;
}