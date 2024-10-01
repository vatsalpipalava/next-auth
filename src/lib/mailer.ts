import nodemailer from "nodemailer";

function replacePlaceholders(
  template: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>
): string {
  return template.replace(/{{(.*?)}}/g, (_, key) =>
    String(values[key.trim()] || "")
  );
}

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_EMAIL_SERVICE,
  host: process.env.SMTP_EMAIL_HOST,
  port: Number(process.env.SMTP_EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_AUTH_EMAIL,
    pass: process.env.SMTP_AUTH_EMAIL_PASSWORD,
  },
});

// export interface SendEmailVerifyMailOptions {
//   username: string;
//   email: string;
//   verifyCode: string;
// }

export const sendEmail = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>,
  recipientMails: string[],
  template: string,
  subject: string
): Promise<void> => {
  const htmlContent = replacePlaceholders(template, values);

  const mailOptions = {
    from: `"Next-Auth" <${process.env.SMTP_AUTH_EMAIL}>`,
    to: recipientMails,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
