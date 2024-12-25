import { LogModel } from "../../data/mongo/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Logseverity } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        try {
            const newLog = await LogModel.create({
                message: log.message,
                origin: log.origin,
                level: log.level
            })
            await newLog.save()
            console.log('Log saved succesffully');
            
        } catch (error) {
            console.log('Error saving log');

        }
    }
    async getLogs(logSeverity: Logseverity): Promise<LogEntity[]> {
        let logs: LogEntity[] = []
        try {
            const cursor = LogModel.find({level: logSeverity }).cursor();
            
            for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
               const log = LogEntity.fromObject(doc)
               logs.push(log)
            }
            return logs
        } catch (error) {
            console.log('An error has occurred');
            
            return logs
        }
    }

}