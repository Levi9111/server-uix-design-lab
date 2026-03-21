import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async ({
  to,
  subject,
  text = '',
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.super_admin_email,
      pass: config.super_admin_email_pass,
    },
  });

  await transporter.sendMail({
    from: config.super_admin_email,
    to,
    subject,
    text,
    html,
  });
};
