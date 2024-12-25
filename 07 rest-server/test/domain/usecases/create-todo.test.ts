import {CreateTodo} from '../../../src/domain/usecases/create-todo'
import {TodoRepository} from '../../../src/domain/repositories/todo.repository'
import { UpdateTodoDto } from '../../../src/domain/dtos/update-todo'
import { CreateTodoDto } from '../../../src/domain/dtos/create-todo'

describe('create-todo.ts', ()=>{
    test('Should call repository', async ()=>{
        const createTodoSpy = jest.spyOn(CreateTodo.prototype, 'execute')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
        const [error, todo] = CreateTodoDto.create({"name": 'test'})
         await new CreateTodo(mockRepository).execute(todo!)
        expect(createTodoSpy).toHaveBeenCalledTimes(1)
    })
})


