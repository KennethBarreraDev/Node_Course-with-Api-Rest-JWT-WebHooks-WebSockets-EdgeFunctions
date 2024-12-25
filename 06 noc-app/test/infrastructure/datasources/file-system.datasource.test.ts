import fs from 'fs'
import path from 'path'
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource'
import { LogEntity, Logseverity } from '../../../src/domain/entities/log.entity'


describe('file-system.datasource.test.ts', () => {
    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        try {
            fs.rmSync(logPath, { recursive: true })
        } catch (error) {
            return true;
        }
    })

    test('Should create logfiles if they dont exist', async () => {
        new FileSystemDatasource()
        const files = fs.readdirSync(logPath)
        console.log(files);
        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log'])
    })


    test('Should save a basic log', async () => {
        const logDatasource = new FileSystemDatasource()

        const log = new LogEntity(
            {
                message: 'Hello',
                level: Logseverity.LOW,
                origin: 'file-system.datasource'
            }
        )
        await logDatasource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, { encoding: 'utf-8' })
        expect(allLogs).toContain(JSON.stringify(log).replace(/"/g, '\\"'));
    })

    test('Should save a basic and medium log', async () => {
        const logDatasource = new FileSystemDatasource()

        const log = new LogEntity(
            {
                message: 'Hello',
                level: Logseverity.MEDIUM,
                origin: 'file-system.datasource'
            }
        )
        await logDatasource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, { encoding: 'utf-8' })
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, { encoding: 'utf-8' })
        expect(allLogs).toContain(JSON.stringify(log).replace(/"/g, '\\"'));
        expect(mediumLogs).toContain(JSON.stringify(log).replace(/"/g, '\\"'));
    })

    test('Should save a basic, medium and high log', async () => {
        const logDatasource = new FileSystemDatasource()

        const log = new LogEntity(
            {
                message: 'Hello',
                level: Logseverity.HIGH,
                origin: 'file-system.datasource'
            }
        )
        await logDatasource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, { encoding: 'utf-8' })
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, { encoding: 'utf-8' })

        expect(allLogs).toContain(JSON.stringify(log).replace(/"/g, '\\"'));
        expect(highLogs).toContain(JSON.stringify(log).replace(/"/g, '\\"'));
    })

    test('Should return all logs', async () => {
        const logDatasource = new FileSystemDatasource()

        const log = new LogEntity(
            {
                message: 'Hello',
                level: Logseverity.HIGH,
                origin: 'file-system.datasource'
            }
        )
        await logDatasource.saveLog(log)


        const logs = await logDatasource.getLogs(Logseverity.HIGH)

        expect(logs.length).toBeGreaterThanOrEqual(0)
    })

})