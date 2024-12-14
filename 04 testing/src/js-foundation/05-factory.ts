export interface buildMakeOptions {
    getAge: (birthdate:string)=>string, 
    generateId: ()=>string
}

export interface Person{
    name: string, 
    birthdate: string
}

export const buildMakePerson = ({getAge, generateId}: buildMakeOptions) => {
    return ({name, birthdate}: Person) => {
        return {
            id: generateId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate)
        }
    }

}
