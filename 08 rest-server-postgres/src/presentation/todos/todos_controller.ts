import { Request, Response } from 'express'
export let todos = [
    {
        id: 1,
        name: 'Buy milk',
    },
    {
        id: 2,
        name: 'Do homework',
    }
]



export class TodosController {
    constructor() {

    }

    getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const todo = todos.find((todo) => todo.id === id)
        if (todo) {
            res.status(200).json(todo)
        }
        else {
            res.status(404).json({ message: "Not found" })
        }

        return
    }

    createTodo = (req: Request, res: Response) => {
        const { name } = req.body

        if (!name) {
            res.status(400).json({ data: "Missing parameters" })
            return
        }
        else {
            const lastId = todos.reduce((last, current) => last > current ? last : current)
            console.log(lastId.id);
            const newTodo = {
                id: lastId.id + 1,
                name: name,
            }
            todos = [...todos, newTodo]
            res.status(201).json({ data: newTodo })
            return 
        }
    }

    update = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const {name} = req.body
        if (!id || !name) {
            res.status(400).json({ data: "Missing todo ID" })
            return
        }
        if(isNaN(id)){
            res.status(400).json({ data: "Bad todo ID" })
            return
        }
        else {
            const index = todos.findIndex((todo)=>todo.id===id)
            if(index===-1){
                res.status(400).json({ data: "Todo not found" })
            return
            }
            todos[index] = {
                id: id,
                name: name
            }
            res.status(200).json(todos[index])
            return 
        }
    }

    deleteTodo =(req: Request, res: Response)=>{
        const id = Number(req.params.id)
    
        if (!id) {
            res.status(400).json({ data: "Missing todo ID" })
            return
        }
        if(isNaN(id)){
            res.status(400).json({ data: "Bad todo ID" })
            return
        }
        else{
            const newTodos = todos.filter((todo)=>todo.id!=id)
            todos = [...newTodos]
            res.status(200).json(newTodos)
            return 
        }
    }
}