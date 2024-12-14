import { httpClientPlugin } from '../../src/adapters/fetch.dapaters'

describe('adapters/fetch.adapter', () => {
    test('httpClientPlugin should return an string', async () => {
        const data = await httpClientPlugin.get('https://jsonplaceholder.typicode.com/todos/1')
        expect(data).toEqual(
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            }
        )
    }),

    test('httpClientPlugin should containg GET, POST, PUT and DELETE methods', async () => {
        
        expect(httpClientPlugin).toHaveProperty('get')
        expect(httpClientPlugin).toHaveProperty('post')
        expect(httpClientPlugin).toHaveProperty('put')
        expect(httpClientPlugin).toHaveProperty('delete')


    })
})