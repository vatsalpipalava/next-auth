import path from "path";
import fs from "fs";
import { sendEmail } from "@/lib/mailer";
import { ApiResponse } from "@/types/ApiResponse";

export interface SendEmailVerifyMailOptions {
  username: string;
  email: string;
  verifyCode: string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const templatePath = path.join(
      process.cwd(),
      "mails",
      "emailVerification.html"
    );
    const verifyCodeTemplate = fs.readFileSync(templatePath, "utf-8");

    const mailData: SendEmailVerifyMailOptions = {
      username,
      email,
      verifyCode,
    };

    await sendEmail(
      mailData,
      [email],
      verifyCodeTemplate,
      "Next-Auth | Verification Code"
    );

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (emailError) {
    if (emailError instanceof Error) {
      console.error("Error sending verification email:", emailError.message);
      return {
        success: false,
        message: "Failed to send verification email.",
        error: emailError.message,
      };
    }
    console.error("Unknown error type:", emailError);
    return {
      success: false,
      message: "Failed to send verification email.",
      error: "Unknown error occurred",
    };
  }
}
