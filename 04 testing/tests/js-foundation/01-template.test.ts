import { emailTemplate } from '../../src/js-foundation/01-template'
describe(
    'js-foundation/01-template.ts', () => {
        test('Email template shoud contain a greeting', ()=>{
            expect(emailTemplate).toContain('Hi, ')
            expect(emailTemplate).toContain('{{name}}')
        })
    }
)