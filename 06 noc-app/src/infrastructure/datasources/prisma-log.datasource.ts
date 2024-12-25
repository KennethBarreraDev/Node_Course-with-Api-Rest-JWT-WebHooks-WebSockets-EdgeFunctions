import { PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Logseverity } from "../../domain/entities/log.entity";
import { parse } from "path";

const prisma = new PrismaClient()

export class PrismaLogDatasource implements LogDataSource {

    async saveLog({ message, level, origin, createdAt }: LogEntity): Promise<void> {
        try {
            await prisma.log.create(
                {
                    data: {
                        message,
                        origin,
                        createdAt,
                        level: level == Logseverity.HIGH ? 'HIGH' : level == Logseverity.MEDIUM ? 'MEDIUM' : 'LOW'
                    }
                }
            )
        } catch (error) {
            console.log('Error creating log');
            console.error(error)

        }
    }
    async getLogs(logSeverity: Logseverity): Promise<LogEntity[]> {
        try {
             const level = Logseverity.HIGH ? 'HIGH' : logSeverity == Logseverity.MEDIUM ? 'MEDIUM' : 'LOW'

            const logs = await prisma.log.findMany({
                where:{
                    level: level
                }
            })

            const parsedLogs = logs.map((log)=> new LogEntity({message: log.message, origin:log.origin, level: logSeverity,createdAt: log.createdAt}))
            
            return parsedLogs;
        } catch (error) {
            console.log('Error creating log');
            console.error(error)
            return []
        }
    }

}