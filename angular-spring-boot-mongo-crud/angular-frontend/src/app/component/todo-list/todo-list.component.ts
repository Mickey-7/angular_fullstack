import { Component, OnInit } from "@angular/core";
import { Todo } from "src/app/domain/todo";
import { NgForm } from "@angular/forms";
import { TodoServiceService } from "src/app/service/todo-service.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  newTodo: Todo = new Todo();
  editing: boolean = false;
  editingTodo: Todo = new Todo();

  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().then((todos) => (this.todos = todos));
  }

  // note: we use NgForm type for the input todoForm
  createTodo(todoForm: NgForm): void {
    this.todoService.createTodo(this.newTodo).then((createTodo) => {
      todoForm.reset();
      this.newTodo = new Todo();
      this.todos.unshift(createTodo);
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).then(() => {
      this.todos = this.todos.filter((todo) => todo.id != id);
    });
  }

  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }

  updateTodo(todoData: Todo): void {
    console.log(todoData);
    this.todoService.updateTodo(todoData).then((updatedTodo) => {
      let existingTodo = this.todos.find((todo) => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
      this.clearEditing();
    });
  }

  toggleCompleted(todoData: Todo): void {
    todoData.completed = !todoData.completed;
    this.todoService.updateTodo(todoData).then((updatedTodo) => {
      let existingTodo = this.todos.find((todo) => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
    });
  }

  editTodo(todoData: Todo): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }
}
