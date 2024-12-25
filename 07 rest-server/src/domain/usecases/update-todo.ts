import { UpdateTodoDto } from "../dtos/update-todo";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

export interface UpdateTodoUsecase{
    execute(id: number, dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUsecase{
    constructor(private readonly repository: TodoRepository){

    }

    async execute(id:number, dto: UpdateTodoDto): Promise<TodoEntity> {
        return await this.repository.update(id, dto)
    }
}


