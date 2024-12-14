import { CreateTable } from '../../domain/use-cases/create-table.use.case'
import { SaveFile } from '../../domain/use-cases/save-file.use-case'
import { ServerApp } from '../../presentation/server-app'

describe('Test server app', () => {
    test('Should create server app intance', () => {
        const server = new ServerApp()
        expect(server).toBeInstanceOf(ServerApp)
    })

    test('Should run server app with default options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

        const options = {
            base: 2,
            limit: 10,
            show: false,
            destination: 'test',
            fileName: 'test'
        }
        
        ServerApp.run(options)

        expect(logSpy).toHaveBeenCalledWith('Server running...')
        expect(logSpy).toHaveBeenCalledWith('File has been created')
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        })
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String), 
            destination: options.destination,
            fileName: options.fileName, 
        });

    })
})