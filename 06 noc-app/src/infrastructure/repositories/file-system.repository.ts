import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Logseverity } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImplementation implements LogRepository{
    constructor(private readonly logDatasource: LogDataSource){
        
    }
    async saveLog(log: LogEntity): Promise<void> {
      this.logDatasource.saveLog(log)
    }
    async getLogs(logSeverity: Logseverity): Promise<LogEntity[]> {
       return await this.logDatasource.getLogs(logSeverity)
    }

}