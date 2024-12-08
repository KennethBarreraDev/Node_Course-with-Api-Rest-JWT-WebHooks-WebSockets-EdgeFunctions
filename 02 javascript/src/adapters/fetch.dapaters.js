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

const httpClientPlugin = {
    get: async (url)=>{
        const response = await axios.get(url);
        return response
    },
    post: async(url, body) =>{},
    put: async(url, body) =>{},
    delete: async(url, body) =>{}
}

module.exports = {
    httpClientPlugin
}