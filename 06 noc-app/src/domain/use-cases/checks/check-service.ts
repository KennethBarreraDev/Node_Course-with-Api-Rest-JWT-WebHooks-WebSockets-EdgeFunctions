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
                const newLog = new LogEntity({message: `Service ${url} working fine`, level: Logseverity.LOW, origin: 'Check service'});
                this.logRepository.saveLog(newLog)
                this.successCallback()
                return true;
            }
        } catch (error) {
            const newLog = new LogEntity({message:`An error has occurred ${error}`, level:Logseverity.HIGH, origin: 'Check service'});
            this.logRepository.saveLog(newLog)
            this.errorCallback('An error has occurred')
            return false;
        }
    }
}