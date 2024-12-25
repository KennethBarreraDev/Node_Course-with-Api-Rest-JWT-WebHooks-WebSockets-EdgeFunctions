import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, Logseverity } from '../../domain/entities/log.entity';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[]
}

export interface Attachement {
    fileName: string;
    path: string
}

export class EmailService {
    private readonly trasnporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAIL_SECRET_KEY
        }
    })

    constructor(private readonly logRepository: LogRepository){

    }

    sendEmail = async (options: SendEmailOptions): Promise<boolean> => {
        try {
            const { subject, to, htmlBody, attachements } = options
            const sendInformation = await this.trasnporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })
            const logEntity = new LogEntity({message: `Email has been sent ${sendInformation}`, level: Logseverity.LOW, origin: 'email_service'})
            this.logRepository.saveLog(logEntity)
            return true
        } catch (error) {
            const logEntity = new LogEntity({message: `Error sending email ${error}`, level: Logseverity.LOW, origin: 'email_service'})
            this.logRepository.saveLog(logEntity)
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = 'Logs del servidor'
        const htmlBody = `
        <h1>Logs del sistema</h1>
        `
        const attachements: Attachement[] = [
            {
                fileName: 'logs-low.log',
                path: 'logs/logs-low.log'
            },

            {
                fileName: 'logs-medium.log',
                path: 'logs/logs-medium.log'
            },

            {
                fileName: 'logs-high.log',
                path: 'logs/logs-high.log'
            }
        ]

        return await this.sendEmail({to: to, subject: subject, htmlBody: htmlBody, attachements: attachements})
    }
}