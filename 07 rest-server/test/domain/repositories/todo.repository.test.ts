import { CreateTodoDto } from "../../../src/domain/dtos/create-todo"
import { UpdateTodoDto } from "../../../src/domain/dtos/update-todo"
import { TodoEntity } from "../../../src/domain/entities/todo.entity"
import {TodoRepository} from "../../../src/domain/repositories/todo.repository"

describe("todo.datasource.ts", ()=>{

    class MockTodoRepository implements TodoRepository{
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
        const todoRepository = new MockTodoRepository();
        expect(todoRepository).toBeInstanceOf(MockTodoRepository)
        expect(typeof todoRepository.create).toBe('function')
        expect(typeof todoRepository.delete).toBe('function')
        expect(typeof todoRepository.get).toBe('function')
        expect(typeof todoRepository.list).toBe('function')
        expect(typeof todoRepository.update).toBe('function')
    })

    test('Create should return TodoEntity', async ()=>{
        const [error, todo] = CreateTodoDto.create({'name': 'Buy milk'})

        const todoRepository = new MockTodoRepository();
        if(todo){
            const newTodo = await todoRepository.create(todo)
            expect(newTodo).toBeInstanceOf(TodoEntity)
        }
    })

    test('Update should return TodoEntity', async ()=>{
        const [error, todo] = UpdateTodoDto.create({'name': 'Buy milk'})

        const todoRepository = new MockTodoRepository();
        if(todo){
            const updatedTodo = await todoRepository.update(1, todo)
            expect(updatedTodo).toBeInstanceOf(TodoEntity)
        }
    })

    test('Delete should return TodoEntity', async ()=>{
        const [error, todo] = UpdateTodoDto.create({'name': 'Buy milk'})

        const todoRepository = new MockTodoRepository();
        if(todo){
            const deletedTodo = await todoRepository.update(1, todo)
            expect(deletedTodo).toBeInstanceOf(TodoEntity)
        }
    })

    test('List should return TodoEntities', async ()=>{
        const [error, todo] = UpdateTodoDto.create({'name': 'Buy milk'})

        const todoRepository = new MockTodoRepository();
        if(todo){
            const todos = await todoRepository.list()
            todos.forEach((item) => {
                expect(item).toBeInstanceOf(TodoEntity);
            });
        }
    })

})