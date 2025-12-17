import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() toggleComplete = new EventEmitter<Task>();

  onDelete(){
    // called when delete button is clicked
    this.deleteTask.emit(this.task._id);
  }

  onEdit(){
    // called when edit button is clicked
    this.editTask.emit(this.task);
  }

  getPriorityClass(): string {
    // returns the bootstrap class based on the priority
    switch (this.task.priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  }

  getPriorityLabel(): string {
    // Show readable priority text
    return this.task.priority ? this.task.priority.toUpperCase() : 'NO PRIORITY';
  }

   onToggleComplete() {
    //completion status
    this.toggleComplete.emit(this.task);
  }

  isOverdue(): boolean {
// check if due date is in the past
    if(!this.task.dueDate) return false;
    const dueDate = new Date(this.task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today ;
  }

  isDueSoon(){
    // check if due date is within 3 days
    if(!this.task.dueDate) return false;
    const dueDate = new Date(this.task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysLater= new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    return dueDate <= threeDaysLater && dueDate >= today;
  }






 }
