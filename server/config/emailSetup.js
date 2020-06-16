/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import sendGridMail from '@sendgrid/mail';
import Env from '../../Env';

const NODE_ENV = Env.get('NODE_ENV');
const SENDGRID_API_KEY = Env.get('SENDGRID_API_KEY');

sendGridMail.setApiKey(SENDGRID_API_KEY);

const mailSender = async (mailData) => {
  try {
    if (NODE_ENV === 'test' || NODE_ENV === 'development') {
      const account = await nodemailer.createTestAccount();

      const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: account.user, pass: account.pass },
      });

      const data = {
        from: 'no-reply@bull.com',
        to: mailData.emailTo,
        subject: mailData.subject,
        html: mailData.message,
      };

      const info = await transporter.sendMail(data);

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } else {
      const msg = {
        to: mailData.emailTo,
        from: 'no-reply@keek.com',
        subject: mailData.subject,
        html: mailData.message,
      };
      await sendGridMail.send(msg);
    }
  } catch (error) {
    console.log(error, 'Mail Error');
  }
};

export default { mailSender };
