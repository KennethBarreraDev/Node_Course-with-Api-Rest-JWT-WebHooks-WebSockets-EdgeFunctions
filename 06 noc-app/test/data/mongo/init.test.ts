import { MongoDatabase } from '../../../src/data/mongo/init'


describe('init.test.ts', () => {
    test('Should connect to Mongo DB', async() => {
        const connection = await MongoDatabase.connect({ dbName: process.env.MONGO_DB_NAME!, mongoUrl: process.env.MONGO_URL! })
        expect(connection).toBeTruthy()
    })

})
