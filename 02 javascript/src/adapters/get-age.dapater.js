const getAgePlugin = require('get-age')


const getAge = (birthDate) =>{
    if(!birthDate){
       throw new Error('Birthdate is requiered') 
    }
    return getAgePlugin(birthDate)
}

module.exports = {
    getAge
}