import { CreateTodoDto } from "../dtos/create-todo";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

export interface CreateTodoUsecase {
    execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUsecase {
    constructor(private readonly repository: TodoRepository) {

    }

    async execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return await this.repository.create(dto)
    }
}


