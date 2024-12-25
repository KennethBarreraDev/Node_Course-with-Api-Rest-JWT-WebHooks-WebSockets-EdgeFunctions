import { envs } from '../../../src/config/plugins/envs.plugin'

describe('envs.plugisn.ts', () => {
    test('Should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'kennethbarreradev@gmail.com',
            MAIL_SECRET_KEY: 'rkjrzhtuyejzzogv',
            DEV: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://kenneth:123456@localhost:27017/',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'kenneth',
            MONGO_PASS: '123456'
        }
        )
    })

    test('Should return error if var is not defined', async()=>{
        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('../../../src/config/plugins/envs.plugin')
            expect(true).toBeFalsy()    
        } catch (error) {
            expect(`${error}`).toContain('should be a valid integer')
            console.log(error);
            
        }
    })
})