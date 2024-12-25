import { LogEntity } from "../../../../src/domain/entities/log.entity"
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service"


describe('check-service.test.ts', () => {
    const mockRepository  = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback =  jest.fn()
    const errorCallback = jest.fn()


    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    )

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('Should call success callback when correctly fetch', async () => {
        const wasOk = await checkService.execute('https://www.google.com.mx/')
        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('Should call error callback when badly fetch', async () => {
        const wasOk = await checkService.execute('https://www.googlebad.com.mx/')
        expect(wasOk).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})