import {TodoRepositoryImplementation} from '../../../src/infraestructure/repositories/todo.repository.implementation'
import {TodoRepository} from '../../../src/domain/repositories/todo.repository'
import { UpdateTodoDto } from '../../../src/domain/dtos/update-todo'
import { CreateTodoDto } from '../../../src/domain/dtos/create-todo'

describe('create-todo.ts', ()=>{
    test('Should call datasource on create', async ()=>{
        const createTodoSpy = jest.spyOn(TodoRepositoryImplementation.prototype, 'create')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
        const [error, todo] = CreateTodoDto.create({"name": 'test'})
         await new TodoRepositoryImplementation(mockRepository).create(todo!)
        expect(createTodoSpy).toHaveBeenCalledTimes(1)
    })
    test('Should call datasource on update', async ()=>{
        const updateTodoSpy = jest.spyOn(TodoRepositoryImplementation.prototype, 'update')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
        const [error, todo] = UpdateTodoDto.create({"name": 'test'})
         await new TodoRepositoryImplementation(mockRepository).update(1, todo!)
        expect(updateTodoSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call datasource on delete', async ()=>{
        const deleteTodoSpy = jest.spyOn(TodoRepositoryImplementation.prototype, 'delete')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
         await new TodoRepositoryImplementation(mockRepository).delete(1)
        expect(deleteTodoSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call datasource on list', async ()=>{
        const listTodoSpy = jest.spyOn(TodoRepositoryImplementation.prototype, 'list')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
         await new TodoRepositoryImplementation(mockRepository).list()
        expect(listTodoSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call datasource on get', async ()=>{
        const getTodoSpy = jest.spyOn(TodoRepositoryImplementation.prototype, 'list')
        const mockRepository = {create: jest.fn(), update: jest.fn(), delete: jest.fn(), get: jest.fn(), list: jest.fn()}
         await new TodoRepositoryImplementation(mockRepository).get(1)
        expect(getTodoSpy).toHaveBeenCalledTimes(1)
    })
})


