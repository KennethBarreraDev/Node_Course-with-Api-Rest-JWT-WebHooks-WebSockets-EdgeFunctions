const getAgePlugin = require('get-age')


export const getAge = (birthDate: string) =>{
    if(!birthDate){
       throw new Error('Birthdate is requiered') 
    }
    return new Date().getFullYear() - new Date(birthDate).getFullYear()
}
