import nodemailer from "nodemailer";

const AdminEmail = process.env.EMAIL_FROM;

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `http://localhost:3000/verification?token=${token}`;

  const mailOptions = {
    from: AdminEmail,
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>To complete your registration, please click on the following link:</p>
      <a href="${confirmLink}">Confirm email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return null;
  }
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: AdminEmail,
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>To reset your password, please click on the following link:</p>
      <a href="${resetLink}">Reset password</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return null;
  }
};
