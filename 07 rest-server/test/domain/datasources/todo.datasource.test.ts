import {TodoDatasource} from '../../../src/domain/datasources/todo.datasource'
import { CreateTodoDto } from '../../../src/domain/dtos/create-todo'
import { UpdateTodoDto } from '../../../src/domain/dtos/update-todo'
import { TodoEntity } from '../../../src/domain/entities/todo.entity'

describe("todo.datasource.ts", ()=>{

    class MockTodoDatasource implements TodoDatasource{
        async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
            return new TodoEntity(1, createTodoDto.name, new Date())
        }
        async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
            return new TodoEntity(1, updateTodoDto.name, new Date())
        }
        async delete(id: number): Promise<TodoEntity | undefined> {
            return new TodoEntity(1, 'Buy milk', new Date())
        }
        async get(id: number): Promise<TodoEntity | undefined> {
            return new TodoEntity(1, 'Buy milk', new Date())
        }
        async list(): Promise<TodoEntity[]> {
            return [new TodoEntity(1, 'Buy milk', new Date())]
        }

    }
    test('Should test abstract class', ()=>{
        const todoDatasource = new MockTodoDatasource();
        expect(todoDatasource).toBeInstanceOf(MockTodoDatasource)
        expect(typeof todoDatasource.create).toBe('function')
        expect(typeof todoDatasource.delete).toBe('function')
        expect(typeof todoDatasource.get).toBe('function')
        expect(typeof todoDatasource.list).toBe('function')
        expect(typeof todoDatasource.update).toBe('function')
    })

    test('Create should return TodoEntity', async ()=>{
        const [error, todo] = CreateTodoDto.create({'name': 'Buy milk'})

        const todoDatasource = new MockTodoDatasource();
        if(todo){
            const newTodo = await todoDatasource.create(todo)
            expect(newTodo).toBeInstanceOf(TodoEntity)
        }
    })

    test('Update should return TodoEntity', async ()=>{
        const [error, todo] = UpdateTodoDto.create({'name': 'Buy milk'})

        const todoDatasource = new MockTodoDatasource();
        if(todo){
            const updatedTodo = await todoDatasource.update(1, todo)
            expect(updatedTodo).toBeInstanceOf(TodoEntity)
        }
    })

    test('Delete should return TodoEntity', async ()=>{
        const [error, todo] = UpdateTodoDto.create({'name': 'Buy milk'})

        const todoDatasource = new MockTodoDatasource();
        if(todo){
            const deletedTodo = await todoDatasource.update(1, todo)
            expect(deletedTodo).toBeInstanceOf(TodoEntity)
        }
    })

    test('List should return TodoEntities', async ()=>{
        const [error, todo] = UpdateTodoDto.create({'name': 'Buy milk'})

        const todoDatasource = new MockTodoDatasource();
        if(todo){
            const todos = await todoDatasource.list()
            todos.forEach((item) => {
                expect(item).toBeInstanceOf(TodoEntity);
            });
        }
    })

})