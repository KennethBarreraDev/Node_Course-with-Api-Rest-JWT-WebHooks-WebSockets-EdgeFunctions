import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from '../../../src/presentation/email/email.service';

describe( 'email.service.test.ts', () => {
  const mockSendMail = jest.fn();
  const mockRepository  = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
}

  nodemailer.createTransport = jest.fn().mockReturnValue( {
    sendMail: mockSendMail
  });

  const emailSevice = new EmailService(mockRepository);


  test( 'should send email', async () => {


    const options: SendEmailOptions = {
      to: 'kenneth@google.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    };

    await emailSevice.sendEmail( options );

    expect( mockSendMail ).toHaveBeenCalledWith( {
      attachments: undefined,
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "kenneth@google.com",
    } );

  } );
});