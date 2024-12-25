import { Router } from "express";
import { TodosController } from "./todos/todos_controller";
import { TodoRoutes } from "./todo_routes";

export class AppRoutes {
    static get routes(): Router{
        const router:Router =  Router()
        const todoController = new TodosController()


        router.use('/api/todos', TodoRoutes.routes)

        return router
    }
}