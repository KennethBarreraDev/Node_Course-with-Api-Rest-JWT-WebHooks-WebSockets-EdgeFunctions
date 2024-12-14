import { LogEntity, Logseverity } from "../entities/log.entity";

export abstract class LogDataSource{
    abstract saveLog(log: LogEntity): Promise<void>
    abstract getLogs(logSeverity: Logseverity): Promise<LogEntity[]>
}