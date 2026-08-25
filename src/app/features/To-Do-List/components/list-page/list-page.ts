import { Component, signal } from '@angular/core';
import { Task } from '../../Model/task';
import { TaskInput } from '../task-input/task-input';
import { TaskList } from '../task-list/task-list';
import { TaskEditModal } from '../task-edit-modal/task-edit-modal';

@Component({
  selector: 'app-list-page',
  imports: [TaskInput,TaskList,TaskEditModal],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})
export class ListPage {
  taskArr = signal<Task[]>([]);
  currentEditTask = signal<Task | null>(null);

  setTaskToEdit(task: Task) {
    this.currentEditTask.set({ ...task });
  }
}
