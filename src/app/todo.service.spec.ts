import { TestBed } from "@angular/core/testing";
import { HttpTestingController } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { TodoService } from "./todo.service";
import { Environment } from "../environments/environment";
import { TodoItem } from "./todo.model";

describe("TodoService", () => {
    let service: TodoService;
    let httpMock: HttpTestingController;
    const apiUrl = `${Environment.apiUrl}/Todo`;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoService, provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(TodoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should fetch todos", () => {
        const mockTodos: TodoItem[] = [
            { id: 1, title: "Test Todo 1", isCompleted: false },
            { id: 2, title: "Test Todo 2", isCompleted: true },
        ];
        service.getTodos().subscribe((todos) => {
            expect(todos.length).toBe(2);
            expect(todos).toEqual(mockTodos);
        });

        const req = httpMock.expectOne(apiUrl);
        expect(req.request.method).toBe("GET");
        req.flush(mockTodos);   
    });
});