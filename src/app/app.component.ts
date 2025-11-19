import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TodoService } from "./todo.service";
import { TodoItem } from "./todo.model";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos: TodoItem[] = [];
  newTitle = '';
  error: string | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.error = null;
      },
      error: (err) => {
        console.error('Failed to load todos:', err);
        this.error = 'Failed to load todos. Please check the API server.';
      }
    });
  }

  addTodoItem(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    this.todoService.addTodo(title).subscribe({
      next: (todo) => {
        this.todos = [...this.todos, todo];
        this.newTitle = '';
        this.error = null;
      },
      error: (err) => {
        console.error('Failed to add todo:', err);
        this.error = 'Failed to add todo. Please try again.';
      }
    });
  }

  deleteTodoItem(todo: TodoItem): void {
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.error = null;
      },
      error: (err) => {
        console.error('Failed to delete todo:', err);
        this.error = 'Failed to delete todo. Please try again.';
      }
    });
  }
}