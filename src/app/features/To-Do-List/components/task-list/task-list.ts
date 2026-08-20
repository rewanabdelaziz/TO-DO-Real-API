import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { Task } from '../../Model/task';
import { ListManagements } from '../../services/list-managements';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit{
  edit = output<Task>();
  private readonly _listManagements = inject(ListManagements);
  private readonly destoryRef = inject(DestroyRef)
  allTasks = signal<Task[]>([]);
  

  ngOnInit(): void {
    this.getAllTasks();

    this._listManagements.listUpdated$.pipe(
      takeUntilDestroyed(this.destoryRef)
    ).subscribe(() => {
      this.getAllTasks();
    });
  }


  getAllTasks() {
    this._listManagements.getAllTasks().subscribe({
      next: (res) => {this.allTasks.set(res.data)  
        console.log(this.allTasks())
      },
      error: (err) => console.log(err)
    });
  }

  toggleComplete(task: Task) {
    if (task.id === undefined) return;
    const newStatus = !task.is_completed;
    this._listManagements.changeCompleteStatus(task.id, newStatus).subscribe({
      next: () => {
        this.allTasks.update(tasks => 
          tasks.map(t => t.id === task.id ? { ...t, is_completed: newStatus } : t)
        );
      },
      error: (err) => console.log(err)
        
    });
  }

  deleteTask(task: Task) {
    if (task.id === undefined) return;
    this._listManagements.deleteTask(task.id).subscribe({
      next: () => {
        this.allTasks.update(tasks => tasks.filter(t => t.id !== task.id));
      },
      error: (err) => console.log(err)
       
    });
  }
  
}
