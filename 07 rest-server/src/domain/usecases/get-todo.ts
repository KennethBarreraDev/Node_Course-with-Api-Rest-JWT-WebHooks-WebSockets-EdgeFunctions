import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

export interface GetTodoUsecase{
    execute(id: number): Promise<TodoEntity | undefined> 
}

export class GetTodo implements GetTodoUsecase{
    constructor(private readonly repository: TodoRepository){

    }

    async execute(id:number): Promise<TodoEntity | undefined> {
        return await this.repository.get(id)
    }
}


