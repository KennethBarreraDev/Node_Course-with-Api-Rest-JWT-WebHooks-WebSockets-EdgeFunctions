import { getUserById, User } from '../../src/js-foundation/03-callbacks'

describe('js-foundation/03-callbacks.ts', ()=>{
    test('getUserById, user does not exist', ()=>{
        const id = 10;
        getUserById(id, (err?:string , user?: User)=>{
            expect(err).toBe('user not found')
            expect(user).toBeUndefined();
        })
    })


    test('getUserById, user exists', ()=>{
        const id = 1;
        getUserById(id, (err?:string , user?: User)=>{
            expect(err).toBeUndefined();
            expect(user).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String)
            })
        })
    
    })

    test('getUserById, user is John', ()=>{
        const id = 1;
        
        getUserById(id, (err?:string , user?: User)=>{
            expect(err).toBeUndefined();
            expect(user).toEqual({
                id: 1,
                name: 'Jhon Doe'
            })
        })
    
    })
})