import { Router } from "express"
import { TodosController } from "./todos/todos_controller"

export class TodoRoutes {
    static get routes(): Router{
        const router:Router =  Router()
        const todoController = new TodosController()
        
        router.get('/', todoController.getTodos)
        router.get('/:id', todoController.getTodoById)
        router.post('/create', todoController.createTodo)
        router.put('/update/:id', todoController.update)
        router.delete('/delete/:id', todoController.deleteTodo)
        return router
    }
}