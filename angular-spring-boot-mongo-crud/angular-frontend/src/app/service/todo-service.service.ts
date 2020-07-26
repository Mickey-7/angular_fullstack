import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "../domain/todo";

@Injectable({
  providedIn: "root",
})
export class TodoServiceService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  private handleError(error: any): Promise<any> {
    console.log("some error occured ", error);
    return Promise.reject(error.message || error);
  }

  getTodos(): Promise<Todo[]> {
    return this.http
      .get(this.baseUrl + "/api")
      .toPromise()
      .catch(this.handleError);
  }

  createTodo(todoData: Todo): Promise<Todo> {
    return this.http
      .post(this.baseUrl + "/api", todoData)
      .toPromise()
      .catch(this.handleError);
  }

  updateTodo(todoData: Todo): Promise<Todo> {
    return this.http
      .put(this.baseUrl + "/api/update/" + todoData.id, todoData)
      .toPromise()
      .catch(this.handleError);
  }

  deleteTodo(id: string): Promise<any> {
    return this.http
      .delete(this.baseUrl + "/api/delete/" + id)
      .toPromise()
      .catch(this.handleError);
  }
}
