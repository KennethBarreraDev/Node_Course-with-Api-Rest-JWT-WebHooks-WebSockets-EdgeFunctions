import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe('todo.entity.test.ts', ()=>{
    const todoEntity = {
        id: 1,
        text: 'Buy milk',
        createdAt: new Date()
    }
    test('Should create TodoEntity', ()=>{
        const todo = new TodoEntity(todoEntity.id, todoEntity.text, todoEntity.createdAt)
        expect(todo).toBeInstanceOf(TodoEntity)
        const {id, text, createdAt} = todo

        expect(id).toEqual(expect.any(Number))
        expect(text).toEqual(expect.any(String))
        expect(createdAt).toEqual(expect.any(Date))
    })
    
    test('Should return todo from object', ()=>{
        const todo = TodoEntity.fromObject(todoEntity)
        expect(todo).toBeInstanceOf(TodoEntity)
    })

    

})