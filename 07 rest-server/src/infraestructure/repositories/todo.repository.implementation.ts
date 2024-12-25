import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/create-todo";
import { UpdateTodoDto } from "../../domain/dtos/update-todo";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoRepositoryImplementation implements TodoRepository{
    constructor(private readonly todoDataSource: TodoDatasource){

    }

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDataSource.create(createTodoDto)
    }
    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDataSource.update(id, updateTodoDto)
    }
    async delete(id: number): Promise<TodoEntity | undefined> {
       return this.todoDataSource.delete(id)
    }
    async get(id: number): Promise<TodoEntity | undefined> {
        return this.todoDataSource.get(id)
    }
    async list(): Promise<TodoEntity[]> {
       return this.todoDataSource.list()
    }

}
