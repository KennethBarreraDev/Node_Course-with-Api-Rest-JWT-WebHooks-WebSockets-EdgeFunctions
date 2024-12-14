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

import { httpClientPlugin } from "../adapters/fetch.dapaters"

export const getPokemonById = async (id: number | undefined) => {
    
    try{
        const data = await httpClientPlugin.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return data.name
    }
    catch(error){
        return "Pokemon not found";
    }
}
