import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiSettings } from 'src/app/api.settings';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  addTodo(todo) {
    const url = environment.baseUrl + apiSettings.todoBaseUrl + apiSettings.addTodo;
    return this.http.post(url, todo)
  }

  getTodos() {
    const url = environment.baseUrl + apiSettings.todoBaseUrl + apiSettings.getTodos;
    return this.http.get(url)
  }

  changeStatus(payload) {
    const url = environment.baseUrl + apiSettings.todoBaseUrl + apiSettings.changeStatus;
    return this.http.post(url, payload)
  }

}
