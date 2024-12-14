//import {yarg} from '../../../config/plugins/yargs.plugin'
const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args]
    const { yarg } = await import('../../../config/plugins/yargs.plugin')
    return yarg
}

describe('test yargs.plugin', () => {
    const originalArgv = process.argv
    beforeEach(() => {
        process.argv = originalArgv
        jest.resetModules()
    })

    test('Should return default', async () => {
        const argv = await runCommand(['-b', '5'])

        expect(argv).toEqual(
            expect.objectContaining(
                {
                    b: 5,
                    l: 10,
                    s: false,
                    n: 'table',
                    d: 'files'
                }
            )
        )
    })

    test('Should return configuration with custom values', async () => {
        const argv = await runCommand(['-b', '10', '-l', '100', '-s', 'true', '-n', 'file', '-d', 'logs'])
        expect(argv).toEqual(
            expect.objectContaining(
                {
                    b: 10,
                    l: 100,
                    s: true,
                    n: 'file',
                    d: 'logs'
                }
            )
        )
    })
})