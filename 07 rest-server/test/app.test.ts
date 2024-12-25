import { AppRoutes } from '../src/presentation/routes'
import { Server } from '../src/presentation/server'

jest.mock("../src/presentation/server")

describe('Testing App.ts', () => {
    test('Should work', async () => {
        await import('../src/app')
        expect(Server).toHaveBeenCalledTimes(1)
        expect(Server).toHaveBeenCalledWith(
            { port: 3000, router: expect.any(Function) }
        )
        expect(Server.prototype.start).toHaveBeenCalledTimes(1)
    })
})