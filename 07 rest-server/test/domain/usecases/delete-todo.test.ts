import {DeleteTodo} from '../../../src/domain/usecases/delete-todo'
import {TodoRepository} from '../../../src/domain/repositories/todo.repository'

describe('delete-todo.ts', ()=>{
    test('Should call repository', async ()=>{
        const deleteTodoSpy = jest.spyOn(DeleteTodo.prototype, 'execute')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
        await new DeleteTodo(mockRepository).execute(1)
        expect(deleteTodoSpy).toHaveBeenCalledTimes(1)
    })
})

