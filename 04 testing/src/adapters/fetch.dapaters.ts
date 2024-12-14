const axios = require('axios');

// const httpClientPlugin = {
//     get: async (url)=>{
//         const response = await fetch(url);
//         const data = await response.json()
//         return data
//     },
//     post: async(url, body) =>{},
//     put: async(url, body) =>{},
//     delete: async(url, body) =>{}
// }

// module.exports = {
//     httpClientPlugin
// }

export const httpClientPlugin = {
    get: async (url: string)=>{
        const response = await axios.get(url);
        return response.data
    },
    post: async(url: string, body: {[key:string]: any}) =>{
        throw new Error('Not implemented')
    },
    put: async(url: string, body: {[key:string]: any}) =>{
        throw new Error('Not implemented')
    },
    delete: async(url: string) =>{
        throw new Error('Not implemented')
    }
}

