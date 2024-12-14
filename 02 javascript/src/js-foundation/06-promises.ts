// const getPokemonById = (id) => {
//     const response = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
//         return response.json().then((info) => {
//             return info
//         }).catch((error) => {
//             throw new Error(error)
//         })
//     }).catch((error) => {
//         throw new Error(error)
//     })
//     return response
// }

const getPokemonById = async (httpClientPlugin, id) => {
    const data = await httpClientPlugin.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return data

}

module.exports = {
    getPokemonById
}