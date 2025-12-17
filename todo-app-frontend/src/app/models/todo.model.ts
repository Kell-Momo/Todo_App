export interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate?: Date;
  completed?: boolean; 
  priority?: 'low' | 'medium' | 'high';
  created_at?: Date;
  updated_at?: Date;
}