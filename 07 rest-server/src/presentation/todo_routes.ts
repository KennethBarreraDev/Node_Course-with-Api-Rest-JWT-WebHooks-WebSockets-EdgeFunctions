import { Router } from "express"
import { TodosController } from "./todos/todos_controller"
import { TodoDatasourceImplementation } from "../infraestructure/datasource/todo.datasource.implementation"
import { TodoRepositoryImplementation } from "../infraestructure/repositories/todo.repository.implementation"

export class TodoRoutes {
    static get routes(): Router{
        const router:Router =  Router()
        const todoDataSource = new TodoDatasourceImplementation()
        const todoRepository = new TodoRepositoryImplementation(todoDataSource)
        const todoController = new TodosController(todoRepository)
        
        router.get('/', todoController.getTodos)
        router.get('/:id', todoController.getTodoById)
        router.post('/create', todoController.createTodo)
        router.put('/update/:id', todoController.update)
        router.delete('/delete/:id', todoController.deleteTodo)
        return router
    }
}