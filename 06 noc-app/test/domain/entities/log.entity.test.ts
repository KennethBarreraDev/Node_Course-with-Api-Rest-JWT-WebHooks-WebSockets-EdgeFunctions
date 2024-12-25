import { LogEntity, Logseverity } from "../../../src/domain/entities/log.entity"

describe('log.entity.ts', () => {

    const logData = {
        message: 'test',
        level: Logseverity.HIGH,
        origin: 'log.entity.test.ts'

    }
    test('Should create log entity instance', () => {

        const log = new LogEntity(logData)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(logData.message)
        expect(log.level).toBe(logData.level)
        expect(log.origin).toBe(logData.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
    test('Should create a LogEntity from json', () => {
        const json = `{
            "message": "test",
            "level": "high",
            "origin": "log.entity.test.ts",
            "createdAt": "2024-12-15T12:00:00Z"
        }`;
        const log = LogEntity.fromJson(json)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe('test')
        expect(log.level).toBe(Logseverity.HIGH)
        expect(log.origin).toBe("log.entity.test.ts")
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('Should create a LogEntity instance from obj', ()=>{
        const log = LogEntity.fromObject(logData)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe('test')
        expect(log.level).toBe(Logseverity.HIGH)
        expect(log.origin).toBe("log.entity.test.ts")
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})