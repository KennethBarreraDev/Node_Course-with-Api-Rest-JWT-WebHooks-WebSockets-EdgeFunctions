import { Logseverity } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PrismaLogDatasource } from "../infrastructure/datasources/prisma-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/file-system.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

export class Server {
    public static start() {
        console.log('Server started...');
        //const logRepository = new LogRepositoryImplementation(new FileSystemDatasource());
        const logRepository = new LogRepositoryImplementation(new PrismaLogDatasource());

        

        const emailService = new EmailService(logRepository);

        const sendEmailLogs = new SendEmailLogs(emailService, logRepository)
        sendEmailLogs.execute('kennethbarreradev@gmail.com')

        const checkService = new CheckService(
            logRepository,
            ()=>{
                console.log('Success fetching URL');
                
            },
            (error: string)=>{
                console.log(error);
                
            }
        )
        
        CronService.createJob('*/5 * * * * *', ()=>{
            checkService.execute('https://jsonplaceholder.typicode.com/todos/1')
        })
    }
}