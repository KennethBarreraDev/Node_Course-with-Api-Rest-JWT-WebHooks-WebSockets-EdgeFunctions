import { LogEntity, Logseverity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
    execute: (url: string) => Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) {
                throw new Error('Error on check service ')
            }
            else {
                const newLog = new LogEntity(`Service ${url} working fine`, Logseverity.LOW);
                this.logRepository.saveLog(newLog)
                this.successCallback()
                return true;
            }
        } catch (error) {
            const newLog = new LogEntity(`An error has occurred ${error}`, Logseverity.HIGH);
            this.logRepository.saveLog(newLog)
            this.errorCallback('An error has occurred')
            return false;
        }
    }
}