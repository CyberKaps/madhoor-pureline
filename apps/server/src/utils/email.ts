import nodemailer from 'nodemailer';

export const sendEmail = async (options: { email: string; subject: string; message: string; html?: string }) => {
  // In development, you can use Mailtrap or any other testing service.
  // In production, use a real provider (SendGrid, AWS SES, Resend, etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT || '2525', 10),
    auth: {
      user: process.env.EMAIL_USER || 'your-mailtrap-user',
      pass: process.env.EMAIL_PASS || 'your-mailtrap-pass',
    },
  });

  const mailOptions = {
    from: 'Madhoor Pureline Support <support@madhoorpureline.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};
