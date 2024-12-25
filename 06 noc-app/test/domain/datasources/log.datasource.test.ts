import { LogDataSource } from '../../../src/domain/datasources/log.datasource'
import { LogEntity, Logseverity } from '../../../src/domain/entities/log.entity'

describe('log.datasource.ts', () => {
    const newLog = new LogEntity({
        origin: 'log.datasource.ts',
        message: 'test log',
        level: Logseverity.LOW
    })
    class MockLogDatasource implements LogDataSource{
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(logSeverity: Logseverity): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('Should test abstract class', async() => {
        const logDataSource = new MockLogDatasource()
        expect(logDataSource).toBeInstanceOf(MockLogDatasource)
        expect(typeof logDataSource.getLogs).toBe('function')
        expect(typeof logDataSource.saveLog).toBe('function')
        await logDataSource.saveLog(newLog)
        const logs  = await logDataSource.getLogs(Logseverity.LOW)
        expect(logs.length).toBeGreaterThanOrEqual(1)

    })
})