export enum Logseverity{
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}


export class LogEntity{
    public level: Logseverity.LOW | Logseverity.MEDIUM  | Logseverity.HIGH;
    public message: string;
    public createdAt: Date

    constructor(message: string, level: Logseverity){
        this.level = level
        this.message = message
        this.createdAt = new Date()
    }

    static fromJson = (json: string): LogEntity=>{
        const {message, level, createdAt} = JSON.parse(json)
        const log = new LogEntity(message, level)
        log.createdAt = new Date(createdAt)
        return log
    }
}