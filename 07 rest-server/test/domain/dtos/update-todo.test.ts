import { UpdateTodoDto } from "../../../src/domain/dtos/update-todo"

describe("update-todo.ts", ()=>{
    test("Should return a todoDTO", ()=>{
        const [error, todo] =  UpdateTodoDto.create({name: "Probe"})
        expect(error).toBeUndefined()
        expect(todo).toBeInstanceOf(UpdateTodoDto)
    }),
    test("Should return an error", ()=>{
        const [error, todo] =  UpdateTodoDto.create({names: "Probe"})
        expect(todo).toBeUndefined()
        expect(error).toBe('Name is required')
    })    
})

