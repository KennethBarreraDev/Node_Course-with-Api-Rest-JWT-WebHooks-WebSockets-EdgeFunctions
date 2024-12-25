import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, Logseverity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface SendEmailLogUseCase{
    execute: (to: string | string[])=>Promise<boolean>   
}

export class SendEmailLogs implements SendEmailLogUseCase{
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){

    }
     execute = async (to: string | string[]): Promise<boolean> => {
        try {
            const sent =  await this.emailService.sendEmailWithFileSystemLogs("kennethbarreradev@gmail.com")
            if(!sent){
                throw new Error('Could not send email')
            }
            return true
        } catch (error) {
            const logEntity = new LogEntity({message: 'Error sending email', level: Logseverity.MEDIUM, origin: 'send-log.ts'})
            this.logRepository.saveLog(logEntity)
            return false   
        }
    }
}