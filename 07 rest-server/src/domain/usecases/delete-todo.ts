import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

export interface DeleteTodoUsecase{
    execute(id: number): Promise<TodoEntity | undefined>
}

export class DeleteTodo implements DeleteTodoUsecase{
    constructor(private readonly repository: TodoRepository){

    }

    async execute(id:number): Promise<TodoEntity | undefined> {
        return await this.repository.delete(id)
    }
}


