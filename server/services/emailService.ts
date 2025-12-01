import { Resend } from "resend";
import { typedEnv } from "@/lib/env";

const resend = new Resend(typedEnv.RESEND_API_KEY);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from: options.from || typedEnv.FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (
  user: { email: string; firstName?: string },
  url: string,
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Xtended Space!</h2>
      <p>Hi ${user.firstName || "there"},</p>
      <p>Thank you for signing up! To complete your registration and start using our platform, please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Verify Email</a>
      </div>
      <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #666;">${url}</p>
      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
        This link will expire in 5 minutes for security reasons. If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: "Verify your email for Xtended Space",
    html,
  });
};

export const sendPasswordResetEmail = async (
  user: { email: string; firstName?: string },
  url: string,
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hi ${user.firstName || "there"},</p>
      <p>We received a request to reset your password for your Xtended Space account. Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Reset Password</a>
      </div>
      <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #666;">${url}</p>
      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
        This link will expire in 1 hour for security reasons. If you didn't request a password reset, you can safely ignore this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: "Reset your password for Xtended Space",
    html,
  });
};
