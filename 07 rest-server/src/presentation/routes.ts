import { Router } from "express";
import { TodosController } from "./todos/todos_controller";
import { TodoRoutes } from "./todo_routes";
import { TodoDatasourceImplementation } from "../infraestructure/datasource/todo.datasource.implementation";
import { TodoRepository } from "../domain/repositories/todo.repository";
import { TodoRepositoryImplementation } from "../infraestructure/repositories/todo.repository.implementation";

export class AppRoutes {
    static get routes(): Router{     
        const router:Router =  Router()

        router.use('/api/todos', TodoRoutes.routes)

        return router
    }
}