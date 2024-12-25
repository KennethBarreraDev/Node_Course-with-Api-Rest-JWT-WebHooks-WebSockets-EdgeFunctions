import mongoose from "mongoose"
import { MongoDatabase } from "../../../src/data/mongo/init"
import { MongoLogDatasource } from "../../../src/infrastructure/datasources/mongo-log.datasource"
import { LogEntity, Logseverity } from "../../../src/domain/entities/log.entity"

describe('mongo-logo.datasource.test.ts', () => {

    beforeAll(()=>{
        MongoDatabase.connect({mongoUrl: process.env.MONGO_URL!, dbName: process.env.MONGO_DB_NAME!})
    })

    afterAll(()=>{
        mongoose.connection.close()
    })
    const log = new LogEntity({
        level: Logseverity.HIGH,
        message: 'test',
        origin: 'mongo-log.datasource.test.ts'
    })
    test('Should create a log', async () => {
        const logDatasource = new MongoLogDatasource()
        const logSpy = jest.spyOn(console,'log')

        await logDatasource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith('Log saved succesffully')
    })

    test("should get logs", async()=>{
        const logDatasource = new MongoLogDatasource()
        const logs = await logDatasource.getLogs(Logseverity.HIGH)
        expect(logs.length).toBeGreaterThanOrEqual(1)
    })
})