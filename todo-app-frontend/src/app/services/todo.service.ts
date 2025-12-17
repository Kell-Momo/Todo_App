import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/todo.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    // GET /api/tasks - Get all tasks
    // Returns an array of Tasks
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl)
    .pipe(map(res => res.data));
  }

  getTaskById(id: string): Observable<Task> {
    // GET /api/tasks/1 - Get one specific task
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/${id}`)
    .pipe(map(res => res.data));
  }



  createTask(task: Task): Observable<Task> {
    // POST /api/tasks - Send new task to backend
    // Backend creates it and sends back the task with _id
    return this.http.post<ApiResponse<Task>>(this.apiUrl, task)
    .pipe(map(res => res.data));
  }



  updateTask(id: string, task: Task): Observable<Task> {
    // PUT /api/tasks/123 - Update existing task
    // Send the updated task data to backend
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, task)
    .pipe(map(res => res.data));
  }

 

  deleteTask(id: string): Observable<any> {
    // DELETE /api/tasks/1 - Remove a task
    return this.http.delete<ApiResponse<Task>>(`${this.apiUrl}/${id}`)
    .pipe(map(res => res.data));
  }
}
