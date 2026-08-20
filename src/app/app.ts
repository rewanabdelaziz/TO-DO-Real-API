import { Component, signal } from '@angular/core';
import { ListPage } from './features/To-Do-List/components/list-page/list-page';

@Component({
  selector: 'app-root',
  imports: [ListPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ToDo');
}
