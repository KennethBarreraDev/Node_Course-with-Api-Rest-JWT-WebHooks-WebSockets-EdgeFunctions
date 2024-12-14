import { buildLogger, logger as WinstonLogger } from '../../src/adapters/logger.adaper'


describe(
    "adapter/logger.adapter",
    () => {
        test('Build logger should return a function logger', () => {
            const logger = buildLogger('test')
            expect(typeof logger.log).toBe('function')
            expect(typeof logger.error).toBe('function')
        })

        test('Logger has been called', () => {
            const winstonLoggerMock = jest.spyOn(WinstonLogger, 'log')
            const message = 'Test message'
            const service = 'Test service'

            const logger = buildLogger(service)

            logger.log(message)

            expect(winstonLoggerMock).toHaveBeenCalledWith(
                'info',
                expect.objectContaining({
                  level: 'info',
                  message: message,
                })
              );
              

        })
    }
)
