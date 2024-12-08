//Import file
//const modules =require('./js-foundation/01-template')

//const {emailTemplate} = require('./js-foundation/01-template')
// require('./js-foundation/02-destructuring')

// require('./js-foundation/03-callbacks')
// const { getAge, generateId} = require('./adapters/index')

// const {buildMakePerson} = require('./js-foundation/05-factury')
// const obj = { name: "Kenneth", birthdate: '2002-12-08' }
// const createPerson = buildMakePerson({getAge, generateId})

const {httpClientPlugin} = require('./adapters/index')
const { getPokemonById } = require('./js-foundation/06-promises')


getPokemonById(httpClientPlugin, 1).then((pokemon) => {
    console.log(pokemon);
}).catch((error) => {
    throw new Error(error)
})






