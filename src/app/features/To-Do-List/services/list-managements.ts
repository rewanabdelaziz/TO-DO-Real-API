import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { APIRes, Task } from '../Model/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListManagements {
  private baseUrl = environment.base_url
  private readonly _http = inject(HttpClient)

  private listUpdatedSource = new Subject<void>();
  listUpdated$ = this.listUpdatedSource.asObservable();

  notifyTaskChanges() {
    this.listUpdatedSource.next();
  }

  addTask(task : Task):  Observable<APIRes>{
    return this._http.post<APIRes>(this.baseUrl,task);
  }

  getAllTasks(): Observable<APIRes<Task[]>>{
    return this._http.get<APIRes<Task[]>>(this.baseUrl);
  }

  deleteTask(id:number): Observable<APIRes>{
    return this._http.delete<APIRes>(`${this.baseUrl}/${id}`);
  }

  editTask(task : Task): Observable<APIRes>{
    return this._http.put<APIRes>(`${this.baseUrl}/${task.id}`, task);
  }
  
  changeCompleteStatus(id: number , status:boolean): Observable<APIRes>{
    return this._http.patch<APIRes>(`${this.baseUrl}/${id}`, {"is_completed": status});
  }
}
