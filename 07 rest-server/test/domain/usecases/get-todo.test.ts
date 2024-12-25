import {GetTodo} from '../../../src/domain/usecases/get-todo'

describe('get-todo.ts', ()=>{
    test('Should call repository', async ()=>{
        const getTodoSpy = jest.spyOn(GetTodo.prototype, 'execute')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
            await new GetTodo(mockRepository).execute(1)
        expect(getTodoSpy).toHaveBeenCalledTimes(1)
    })
})



