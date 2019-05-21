import { Injectable, Inject, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { TodoItem } from '../model/todoitem'

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }


  GetTodoList(): Observable<TodoItem[]> {
    return this.http.get<any>(this.baseUrl + 'todolist/gettodolist');

  }

  AddOrUpdateTodoItem(item: TodoItem) { 
    return this.http.post<any>(this.baseUrl + 'todolist/AddOrUpdateItem',  item);
  }



  DeleteTodoItem(item: any) {
    debugger;
    return this.http.post<any>(this.baseUrl + 'todolist/DeleteItem', item);
  }
}
