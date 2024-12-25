import { CreateTodoDto } from "../../../src/domain/dtos/create-todo"

describe("create-todo.ts", ()=>{
    test("Should return a todoDTO", ()=>{
        const [error, todo] =  CreateTodoDto.create({name: "Probe"})
        expect(error).toBeUndefined()
        expect(todo).toBeInstanceOf(CreateTodoDto)
    }),
    test("Should return an error", ()=>{
        const [error, todo] =  CreateTodoDto.create({names: "Probe"})
        expect(todo).toBeUndefined()
        expect(error).toBe('Text property is required')
    })    
})

