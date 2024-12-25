import { LogEntity } from "../../../../src/domain/entities/log.entity"
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-logs"
import { EmailService } from "../../../../src/presentation/email/email.service"

describe('send-logs.test.ts', () => {

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    const mockEmailService  = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository = {
        getLogs: jest.fn(),
        saveLog: jest.fn()
    }


    test('Should call send email ', async () => {
        const email = 'kennethbarreradev@gmail.com'
        const emailService = new SendEmailLogs(mockEmailService as any, mockLogRepository)
        const result = emailService.execute(email)
        expect(result).toBeTruthy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(email)
    })
})