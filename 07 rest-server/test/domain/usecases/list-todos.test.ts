import {ListTodo} from '../../../src/domain/usecases/list-todos'

describe('list-todos.ts', ()=>{
    test('Should call repository', async ()=>{
        const listTodoSpy = jest.spyOn(ListTodo.prototype, 'execute')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
            await new ListTodo(mockRepository).execute()
        expect(listTodoSpy).toHaveBeenCalledTimes(1)
    })
})




