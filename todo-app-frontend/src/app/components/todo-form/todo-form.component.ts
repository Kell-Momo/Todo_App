import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit, OnChanges {

@Output() taskSubmitted = new EventEmitter<Task>();
@Input() editingTask: Task | null = null;

taskForm!: FormGroup;

constructor(private formBuilder: FormBuilder){}
//create forms easily with the FormBuilder

ngOnInit(): void {
  //initialise form when component first loads
  this.initializeForm();
}
ngOnChanges(changes: SimpleChanges): void {

  if (!this.taskForm) return;

  if(changes['editingTask'] && this.editingTask){
    //if editingTask changed and has a value, fill the form with the task's current value
    this.taskForm.patchValue(this.editingTask);
  } else if (changes['editingTask'] && !this.editingTask){
    //if editingTask changed and it's now null, clear the form
    this.taskForm.reset({completed: false});
  }
}

initializeForm(){
  //create a new form with two fields
  this.taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: [''],
    priority: [''],
    completed: [false]
  });
}

onSubmit(){
  //called when user clicks "Add Task" or "Update Task"
  if(this.taskForm.valid){
    const task: Task = {
      ...this.editingTask, //if editing, keep the existing task's id
      ...this.taskForm.value //add title and description from form
    };
    this.taskSubmitted.emit(task); //send the task to parent component
    this.taskForm.reset({completed: false});
  }
}

get title(){
  return this.taskForm.get('title');
}

get description(){
  return this.taskForm.get('description');
}

get dueDate(){
  return this.taskForm.get('dueDate');
}

get priority(){

  return this.taskForm.get('priority');
}

}
