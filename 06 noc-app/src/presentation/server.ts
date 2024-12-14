import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/file-system.repository";
import { CronService } from "./cron/cron-service";

export class Server {
    public static start() {
        console.log('Server started...');
        const logRepository = new LogRepositoryImplementation(new FileSystemDatasource());
        
        const checkSercice = new CheckService(
            logRepository,
            ()=>{
                console.log('Success fetching URL');
                
            },
            (error: string)=>{
                console.log(error);
                
            }
        )
        
        CronService.createJob('*/5 * * * * *', ()=>{
            checkSercice.execute('https://jsonplaceholder.typicode.com/todos/1')
        })
    }
}