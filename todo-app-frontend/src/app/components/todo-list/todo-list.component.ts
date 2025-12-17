import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Task } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,  TodoItemComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  tasks: Task[] = [];
  editingTask: Task | null = null;
  loading: boolean = false;
  error: string | null = null;
  sortBy: 'date' | 'priority' | 'created' = 'date'; // sort tasks


constructor(private taskService: TodoService){}

ngOnInit(): void {
  // fetch all tasks when component loads
  this.loadTasks();
}

loadTasks(){
  // fetch all tasks from backend
  this.loading = true;
  this.error = null;

  this.taskService.getAllTasks().subscribe({
    next: (tasks) => {
      this.tasks = tasks;
      this.sortTasks(); // sort after loading
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load tasks.';
      console.log(err);
    }
  });

}

onTaskSubmitted(task: Task) {
    // when form is submitted
    
    if (this.editingTask && this.editingTask._id) {
      // update mode
      this.taskService.updateTask(this.editingTask._id, task).subscribe({
        next: () => {
          this.loadTasks();        // Refresh the list
          this.editingTask = null; // Exit edit mode
        },
        error: (err) => {
          this.error = 'Failed to update task';
          console.error(err);
        }
      });
    } else {
      // add mode
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.loadTasks();  // Refresh list with new task
        },
        error: (err) => {
          this.error = 'Failed to create task';
          console.error(err);
        }
      });
    }
  }

  onDeleteTask(id: string | undefined) {
    // User clicked delete button
    if (id) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();  // Refresh list (task removed)
        },
        error: (err) => {
          this.error = 'Failed to delete task';
          console.error(err);
        }
      });
    }
  }

  onEditTask(task: Task) {
    // User clicked edit button
    this.editingTask = { ...task };  // Copy the task
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to form
  }

  // Toggle completion status
  onToggleComplete(task: Task) {
    if (task._id) {
      const updatedTask = { ...task, completed: !task.completed };
      this.taskService.updateTask(task._id, updatedTask).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          this.error = 'Failed to update task';
          console.error(err);
        }
      });
    }
  }

  cancelEdit() {
    // User cancelled edit
    this.editingTask = null;
  }


  sortTasks() {
    // Sort tasks based on selected option
    if (this.sortBy === 'date') {
      // Sort by due date (soonest first)
      this.tasks.sort((a, b) => {
        if (!a.dueDate) return 1;   // Tasks without due date go last
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    } else if (this.sortBy === 'priority') {
      // Sort by priority (high -> medium -> low)
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      this.tasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 3;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 3;
        return aPriority - bPriority;
      });
    } else if (this.sortBy === 'created') {
      // Sort by creation date (newest first)
      this.tasks.sort((a, b) => {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    }
  }

  onSortChange(newSort: 'date' | 'priority' | 'created') {
    // User changed sort option
    this.sortBy = newSort;
    this.sortTasks();
  }

  getOverdueTasks(): Task[] {
    // Return only overdue tasks
    return this.tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  }

   trackByTaskId(index: number, task: Task): string {
    return task._id || index.toString();
  }

}
