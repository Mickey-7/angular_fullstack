import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TutorialService {
  // invoke HttpClient
  constructor(private http: HttpClient) {}

  // define the url from node backend
  baseURL = "http://localhost:8080/api/tutorials";

  // create method and invoke http with baseURL inside
  getAll() {
    return this.http.get(this.baseURL);
  }

  get(id) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  create(data) {
    return this.http.post(this.baseURL, data);
  }

  update(id, data) {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  deleteAll() {
    return this.http.delete(this.baseURL);
  }

  findByTitle(title) {
    return this.http.get(`${this.baseURL}?title=${title}`);
  }
}
