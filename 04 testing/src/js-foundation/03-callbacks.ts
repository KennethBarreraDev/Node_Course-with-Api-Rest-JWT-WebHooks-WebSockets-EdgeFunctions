export interface User{
    id: number,
    name: string
}

export const users: User[] = [
    {
        id: 1,
        name: 'Jhon Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
]



export function getUserById(id: number, printUser: (err?: string, user?: User)=> void) {
    const user = users.find((u) => u.id === id)
    if(!user){
       return printUser('user not found', undefined)
    }
    else{
        return printUser(undefined,user)
    }
}

getUserById(1, (err?:string , user?: User)=>{
    if(err){
        throw new Error("user not found")
    }
    else{
        console.log(user);
    }
})


