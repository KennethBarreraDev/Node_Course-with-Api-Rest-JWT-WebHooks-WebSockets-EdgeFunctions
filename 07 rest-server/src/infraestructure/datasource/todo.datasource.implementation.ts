import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/create-todo";
import { UpdateTodoDto } from "../../domain/dtos/update-todo";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDatasourceImplementation implements TodoDatasource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: {
                name: createTodoDto.name,
                createdAt: new Date()
            }
        })

        return TodoEntity.fromObject(newTodo)
    }
    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },

            data: {
                name: updateTodoDto.name
            }
        })

        return TodoEntity.fromObject(updateTodoDto)
    }
    async delete(id: number): Promise<TodoEntity | undefined> {
        try {

            const deleteTodo = await prisma.todo.delete({
                where: {
                    id: id,
                },
            })

            if(deleteTodo){
                return TodoEntity.fromObject(deleteTodo)
            }
            else{
                return undefined
            }

        } catch (error) {
            return undefined;
        }
    }

    async get(id: number): Promise<TodoEntity | undefined> {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        })
        if (todo) {
            return TodoEntity.fromObject(todo)
        }
        else {
            return undefined
        }

    }
    async list(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()
        const parsedTodos = todos.map((todo) => TodoEntity.fromObject(todo))
        return parsedTodos
    }

}