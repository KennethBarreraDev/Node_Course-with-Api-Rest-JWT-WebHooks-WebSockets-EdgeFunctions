import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

export interface ListTodoUsecase{
    execute(): Promise<TodoEntity[]> 
}

export class ListTodo implements ListTodoUsecase{
    constructor(private readonly repository: TodoRepository){

    }

    async execute(): Promise<TodoEntity[]> {
        return await this.repository.list()
    }
}


