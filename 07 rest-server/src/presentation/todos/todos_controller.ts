import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
import { CreateTodoDto } from '../../domain/dtos/create-todo'
import { UpdateTodoDto } from '../../domain/dtos/update-todo'
import { TodoRepository } from '../../domain/repositories/todo.repository'
import { CreateTodo } from '../../domain/usecases/create-todo'
import { ListTodo } from '../../domain/usecases/list-todos'
import { GetTodo } from '../../domain/usecases/get-todo'
import { UpdateTodo } from '../../domain/usecases/update-todo'
import { DeleteTodo } from '../../domain/usecases/delete-todo'

export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) {

    }

    getTodos = async (req: Request, res: Response) => {
        // const todos = await this.todoRepository.list()
        const todos = await new ListTodo(this.todoRepository).execute()
        res.json(todos)
    }

    getTodoById = async (req: Request, res: Response) => {
        const id = Number(req.params.id)

        //const todo = await this.todoRepository.get(id)
        const todo = await new GetTodo(this.todoRepository).execute(id)
        if (todo) {
            res.status(200).json(todo)
        }
        else {
            res.status(404).json({ message: "Not found" })
        }

        return
    }

    createTodo = async (req: Request, res: Response) => {
        const createTodoDto = CreateTodoDto.create(req.body)

        const [error, todo] = createTodoDto;

        if (error) {
            res.status(400).json({ data: error})
            return
        }
        else {
            const newTodo = await new CreateTodo(this.todoRepository).execute(todo!)
            res.status(201).json({ data: newTodo })
            return
        }
    }

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const [error, todoDto] = UpdateTodoDto.create(req.body)

        if (!id || error) {
            res.status(400).json({ data: "Todo doesn't exist" })
            return
        }
        if (isNaN(id)) {
            res.status(400).json({ data: "Bad todo ID" })
            return
        }
        else {
            const todo = await new GetTodo(this.todoRepository).execute(id)
            if (todo) {
                const updatedTodo = await new UpdateTodo(this.todoRepository).execute(id, todoDto!)
                res.status(200).json(updatedTodo)
                return
            }
            else {
                res.status(400).json({ data: "Todo not found" })
                return
            }

        }
    }

    deleteTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id)


        
        if (!id) {
            res.status(400).json({ data: "Missing todo ID" })
            return
        }
        if (isNaN(id)) {
            res.status(400).json({ data: "Bad todo ID" })
            return
        }
        else {
            const todo = await new GetTodo(this.todoRepository).execute(id)
            if(todo){
                const deletedTodo = await new DeleteTodo(this.todoRepository).execute(id)
                  res.status(200).json(deletedTodo)
            }else{
                res.status(400).json({ data: "Todo doesn't exist" })
            }
            return
        }
    }
}