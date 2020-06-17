import emailService from '../config/emailSetup';
import sendMailQueue from '../config/bullConfig';
import template from './template';

/**
 *
 * @param {*} emailTo
 * @param {*} link
 * @param {*} name
 * @returns {*} sends an email to a new user
 */
const registrationEmail = (emailTo, link, name) => {
  const subject = 'Welcome to Keek';
  const body = `<p>Dear ${name},</p>
  <p>We are thrilled to have you.</p>
  <p>Click the button to confirm your email</p>
      <a href="${link}" class="button">Confirm email</a>`;
  const message = template(subject, body, emailTo);

  const options = {
    attempts: 2,
  };
  const data = { emailTo, subject, message };

  // Producer: adds jobs to que, in this case emails to be sent out upon signup
  sendMailQueue.add(data, options);
};

/**
 *
 * @param {*} emailTo
 * @param {*} link
 * @param {*} name
 * @returns {*} sends an email to a user requesting a password reset
 */
const forgotPasswordEmail = (emailTo, link, name) => {
  const subject = 'Keek password reset';
  const body = `<p>Hi ${name},</p>
  <p>Click the link below to reset your password.</p>
  <a href="${link}" class="button">Reset Password</a>`;
  const message = template(subject, body, emailTo);

  const options = {
    attempts: 2,
  };
  const data = { emailTo, subject, message };

  sendMailQueue.add(data, options);
};

// Consumer: this gets called each time the producer receives a new email.
sendMailQueue.process(async (job) => {
  emailService.mailSender(job.data);
});

const Notifications = { registrationEmail, forgotPasswordEmail };

export default Notifications;
