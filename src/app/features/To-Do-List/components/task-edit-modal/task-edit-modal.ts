import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../Model/task';
import { ListManagements } from '../../services/list-managements';

@Component({
  selector: 'app-task-edit-modal',
  imports: [ReactiveFormsModule], 
  templateUrl: './task-edit-modal.html',
  styleUrl: './task-edit-modal.css',
})
export class TaskEditModal {
  selectedTask = input<Task | null>(null);
  private readonly _listManagements = inject(ListManagements);
  private readonly _fb = inject(FormBuilder);

 
  taskForm: FormGroup = this._fb.group({
    title: ['', Validators.required],
    description: [''],
    due_at: [''],
    is_completed: [false, Validators.required]
  });

  minDate = new Date().toISOString().split('T')[0];

  constructor() {
   
    effect(() => {
      const task = this.selectedTask();
      if (task) {
        this.taskForm.patchValue({
          title: task.title ?? '',
          description: task.description ?? '',
          due_at: task.due_at ?? '',
          is_completed: task.is_completed ?? false
        });
      }
    });
  }

  onUpdate() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task = this.selectedTask();
    if (!task || task.id === undefined) return;

    const updatedTask: Task = {
      ...task,
      ...this.taskForm.value
    };

    this._listManagements.editTask(updatedTask).subscribe({
      next: () => {
        this._listManagements.notifyTaskChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}