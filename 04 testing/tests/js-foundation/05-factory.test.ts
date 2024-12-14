import { buildMakeOptions, buildMakePerson } from '../../src/js-foundation/05-factory'

describe('js-foundation/05-factory.ts', ()=>{
    test('Should return a function',()=>{
        const generateId = ()=>'1234'
        const getAge = (value:string)=>'24'
        const makePerson = buildMakePerson({getAge, generateId});
        expect(typeof makePerson).toBe('function')
    })

    test('Should return a person', ()=>{
        const generateId = ()=>'1234'
        const getAge = (value:string)=>'24'
        const makePerson = buildMakePerson({getAge, generateId});
        const person =  makePerson({name: "Kenneth", birthdate: "2000-08-09"})
        expect(person).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            birthdate: expect.any(String),
            age: expect.any(String)
        })
    
    })
})