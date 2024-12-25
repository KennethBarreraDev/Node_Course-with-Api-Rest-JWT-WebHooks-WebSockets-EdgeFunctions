import { LogModel } from '../../../../src/data/mongo/models/log.model'
import { MongoDatabase } from '../../../../src/data/mongo/init'
import mongoose from 'mongoose'




describe(
    'log.model.ts',
    () => {
        beforeEach(async () => {
            await MongoDatabase.connect({ dbName: process.env.MONGO_DB_NAME!, mongoUrl: process.env.MONGO_URL! })
        })

        afterEach(async () => {
            await mongoose.connection.close()
        })

        test('Should return log model', async () => {
            const logData = {
                origin: 'log.model.test.ts',
                message: 'test-message',
                level: 'low'
            }

            const log = await LogModel.create(logData)
            expect(log).toEqual(expect.objectContaining({
                message: 'test-message',
                origin: 'log.model.test.ts',
                level: 'low',

            }))
        })

        test('Should return schema object', ()=>{
            const schema = LogModel.schema.obj
            expect(schema).toEqual(expect.objectContaining(
                {
                    message: { type: expect.any(Function), required: true },
                    createdAt: {
                      type: expect.any(Function),
                      required: false,
                      default: expect.any(Date)
                    },
                    origin: { type: expect.any(Function), required: true },
                    level: {
                      type: expect.any(Function),
                      required: true,
                      enum: [ 'low', 'high', 'medium' ]
                    }
                  }
            ))
            
        })
    }
)