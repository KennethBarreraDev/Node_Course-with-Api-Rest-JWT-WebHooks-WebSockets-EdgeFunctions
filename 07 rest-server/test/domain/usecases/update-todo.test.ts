import {UpdateTodo} from '../../../src/domain/usecases/update-todo'
import {TodoRepository} from '../../../src/domain/repositories/todo.repository'
import { UpdateTodoDto } from '../../../src/domain/dtos/update-todo'

describe('create-todo.ts', ()=>{
    test('Should call repository', async ()=>{
        const updateTodoSpy = jest.spyOn(UpdateTodo.prototype, 'execute')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
        const [error, todo] = UpdateTodoDto.create({"name": 'test'})
         await new UpdateTodo(mockRepository).execute(1, todo!)
        expect(updateTodoSpy).toHaveBeenCalledTimes(1)
    })
})


