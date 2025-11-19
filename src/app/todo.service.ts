import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TodoItem } from "./todo.model";
import { Environment } from "../environments/environment";

interface CreateTodoRequest {
  title: string;
}

@Injectable({
    providedIn: "root"
})

export class TodoService {
    private apiUrl: string = `${Environment.apiUrl}/todo`;
    constructor(private http: HttpClient) {}

    getTodos(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>(this.apiUrl);
    }  
     
    addTodo(title: string): Observable<TodoItem> {
        const requestBody: CreateTodoRequest = { title };
        return this.http.post<TodoItem>(this.apiUrl, requestBody);
    }

    deleteTodo(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}