import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Logseverity } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDatasource implements LogDataSource {
    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFiles()
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath, { recursive: true });
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((filePath) => {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');
            }
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = JSON.stringify(newLog.message)

        fs.appendFileSync(this.allLogsPath, `${JSON.stringify(logAsJson)}\n`)

        if (newLog.level == Logseverity.MEDIUM) {
            fs.appendFileSync(this.mediumLogsPath, `${JSON.stringify(logAsJson)}\n`)
        }
        else if (newLog.level == Logseverity.HIGH) {
            fs.appendFileSync(this.highLogsPath, `${JSON.stringify(logAsJson)}\n`)
        }
        else {
            return;
        }
    }

    async getLogs(logSeverity: Logseverity): Promise<LogEntity[]> {
        switch (logSeverity) {
            case Logseverity.LOW:
                return this.getLogsFromFile(logSeverity, this.allLogsPath);
            case Logseverity.MEDIUM:
                return this.getLogsFromFile(logSeverity, this.allLogsPath);
            case Logseverity.HIGH:
                return this.getLogsFromFile(logSeverity, this.allLogsPath);
            default:
                throw new Error(`${logSeverity} not found`)
        }
    }

    private getLogsFromFile = (logSeverity: Logseverity, path: string): LogEntity[] => {
        const allLogs = fs.readFileSync(this.allLogsPath, { encoding: 'utf-8' })

        const filteredLogs = allLogs
            .split("\n")
            .map(log => LogEntity.fromJson(log))
            .filter(parsedLog => parsedLog && parsedLog.level === logSeverity);
        return filteredLogs;

    }

}