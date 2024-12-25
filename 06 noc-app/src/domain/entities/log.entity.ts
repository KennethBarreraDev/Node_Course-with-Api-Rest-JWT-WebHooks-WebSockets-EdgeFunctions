export enum Logseverity{
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

interface Options{
    level: Logseverity.LOW | Logseverity.MEDIUM  | Logseverity.HIGH;
    message: string;
    createdAt?: Date;
    origin: string;
}


export class LogEntity{
    public level: Logseverity.LOW | Logseverity.MEDIUM  | Logseverity.HIGH;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor({message, level, origin}: Options){
        this.level = level
        this.message = message
        this.createdAt = new Date(),
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity=>{
        json = (json==='') ? '{}' : json
        const {message, level, createdAt, origin} = JSON.parse(json)
        const log = new LogEntity({message, level, createdAt, origin})
        log.createdAt = new Date(createdAt)
        return log
    }
    static fromObject = (object: {[key:string]:any}):LogEntity=>{
        
        const {message, level, createdAt, origin} = object
        const log = new LogEntity({message, level, createdAt, origin})
        return log
    }
}