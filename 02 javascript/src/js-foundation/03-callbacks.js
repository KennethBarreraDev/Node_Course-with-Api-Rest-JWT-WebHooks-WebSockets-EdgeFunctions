const users = [
    {
        id: 1,
        name: 'Jhon Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
]



function getUserById(id, printUser) {
    const user = users.find((u) => u.id === id)
    if(!user){
       return printUser('error', undefined)
    }
    else{
        return printUser(undefined,user)
    }
}

getUserById(1, (err, user)=>{
    if(err){
        throw new Error("user not found")
    }
    else{
        console.log(user);
    }
})


