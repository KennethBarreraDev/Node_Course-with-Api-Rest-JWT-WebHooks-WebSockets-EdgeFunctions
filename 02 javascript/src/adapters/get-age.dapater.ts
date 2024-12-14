const getAgePlugin = require('get-age')


export const getAge = (birthDate: string) =>{
    if(!birthDate){
       throw new Error('Birthdate is requiered') 
    }
    return getAgePlugin(birthDate)
}

