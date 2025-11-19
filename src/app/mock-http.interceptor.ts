import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TodoItem } from './todo.model';

// Store todos in a closure so they persist across requests
let todos: TodoItem[] = [
  { id: 1, title: 'Learn Angular', isCompleted: true },
  { id: 2, title: 'Build a Todo App', isCompleted: false },
  { id: 3, title: 'Deploy to production', isCompleted: false },
];
let nextId = 4;

export const mockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  // Match GET /api/todo
  if (req.method === 'GET' && req.url.endsWith('/api/todo')) {
    return of(new HttpResponse({ status: 200, body: todos })).pipe(delay(500));
  }

  // Match POST /api/todo
  if (req.method === 'POST' && req.url.endsWith('/api/todo')) {
    const newTodo: TodoItem = {
      id: nextId++,
      title: (req.body as any).title,
      isCompleted: false,
    };
    todos.push(newTodo);
    return of(new HttpResponse({ status: 201, body: newTodo })).pipe(delay(500));
  }

  // Match DELETE /api/todo/:id
  if (req.method === 'DELETE' && req.url.match(/\/api\/todo\/\d+$/)) {
    const id = parseInt(req.url.split('/').pop()!, 10);
    todos = todos.filter(todo => todo.id !== id);
    return of(new HttpResponse({ status: 200, body: null })).pipe(delay(500));
  }

  // Pass through any unmatched requests
  return next(req);
};
