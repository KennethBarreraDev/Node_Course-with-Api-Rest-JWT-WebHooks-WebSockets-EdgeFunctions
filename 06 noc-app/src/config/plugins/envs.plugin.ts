import 'dotenv/config'
import * as env from 'env-var'


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAIL_SECRET_KEY: env.get('MAIL_SECRET_KEY').required().asString(),   
    DEV: env.get('DEV').required().asBool()
}