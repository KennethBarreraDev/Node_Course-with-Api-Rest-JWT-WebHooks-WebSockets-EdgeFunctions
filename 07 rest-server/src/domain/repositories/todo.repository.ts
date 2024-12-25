import { CreateTodoDto } from "../dtos/create-todo";
import { UpdateTodoDto } from "../dtos/update-todo";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository{
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
    abstract update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    abstract delete(id: number): Promise<TodoEntity | undefined>
    abstract get(id: number): Promise<TodoEntity | undefined>
    abstract list(): Promise<TodoEntity[]>
}