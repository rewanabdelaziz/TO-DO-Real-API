import { Component, inject, signal } from '@angular/core';
import { ListManagements } from '../../services/list-managements';
import { Task } from '../../Model/task';

@Component({
  selector: 'app-task-input',
  imports: [],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInput {
  taskValue = signal('');
  private readonly _listManagements = inject(ListManagements);

  onAdd() {
    const newTask: Task = { title: this.taskValue(), is_completed: false };
    this._listManagements.addTask(newTask).subscribe({
    next: () => {
        this._listManagements.notifyTaskChanges();
        this.taskValue.set('')
      },
      error: (err) => console.log(err)
    });
  }
}
