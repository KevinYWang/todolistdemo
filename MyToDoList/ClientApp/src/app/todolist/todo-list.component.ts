import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from '../model/todoitem';
import { TodolistService } from '../service/todolist.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  todoItemForm: FormGroup;

  public todoItems: TodoItem[] = [];

  constructor(
    private todoListService: TodolistService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.GetTodoList();
    this.todoItemForm = this.formBuilder.group({
      itemTitle: ['', Validators.required]
    });
  }

  get f() { return this.todoItemForm.controls; }

  GetTodoList() {
    let listObservable = this.todoListService.GetTodoList()
      .subscribe(
        (data: TodoItem[]) => {
          if (data) {
            this.todoItems = data;
          }
          else {
            alert("Error in getting your to-do list. Please try it later. ")
          }
        },
        error => {
          alert(error);
        });

  }
  ChangeStatus(item: TodoItem) {
    item.isCompleted = !item.isCompleted;
    this.todoListService.AddOrUpdateTodoItem(item)
      .pipe(first())
      .subscribe(
        (data: TodoItem) => {
          if (data) {
            let existingItem = this.todoItems.find(x => x.id == data.id);
            if (existingItem == null)
              this.todoItems.push(data);
          }
          else {
            alert("Error in adding the new task. Please try it later. ")
          }
        },
        error => {
          alert(error);
        });
  }
  AddItem() {
    let taskTitle = this.todoItemForm.controls["itemTitle"].value;
    let item = new TodoItem(0, taskTitle, false);

    this.todoListService.AddOrUpdateTodoItem(item)
      .pipe(first())
      .subscribe(
        (data: TodoItem) => {
          if (data) {
            debugger;
            let existingItem = this.todoItems.find(x => x.id == data.id);
            if (existingItem == null)
              this.todoItems.push(data);
            this.todoItemForm.controls["itemTitle"].setValue("");
          }
          else {
            alert("Error in adding the new task. Please try it later. ")
          }
        },
        error => {
          alert(error);
        });
  }
  DeleteTodoItem(item: TodoItem) {
    debugger;
    this.todoListService.DeleteTodoItem(item)
      .subscribe(
        (data: boolean) => {
          if (data) {
            this.todoItems = this.todoItems.filter(x => x.id != item.id)
          }
          else {
            alert("Error in deleting this task. Please try it later. ")
          }
        },
        error => {
          alert(error);
        });
  }

}