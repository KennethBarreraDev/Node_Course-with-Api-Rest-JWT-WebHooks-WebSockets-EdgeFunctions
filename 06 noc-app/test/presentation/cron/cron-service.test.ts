import { CronService } from "../../../src/presentation/cron/cron-service"

describe('cron-service.test.ts', () => {
    const mockTick = jest.fn()
    test('Should create a Job', (done) => {

        const job = CronService.createJob('* * * * * *', mockTick);
        setTimeout(()=>{
            expect(mockTick).toHaveBeenCalledTimes(2)
            done();
        }, 2000)
    })
})