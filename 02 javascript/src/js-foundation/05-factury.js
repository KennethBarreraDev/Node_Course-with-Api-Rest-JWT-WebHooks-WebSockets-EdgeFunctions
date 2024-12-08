
const buildMakePerson = ({ getAge, generateId }) => {
    return ({ name, birthdate }) => {
        return {
            id: generateId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate)
        }
    }

}


module.exports = {
    buildMakePerson
}