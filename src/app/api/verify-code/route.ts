import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    if (user.isVerified) {
      return Response.json(
        {
          success: true,
          message: "Account already verified.",
        },
        {
          status: 400,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = user.verifyCodeExpiry && new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      user.verifyCode = null;
      user.verifyCodeExpiry = null;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully.",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please, signup again to get new code.",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code.",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error verifying user.",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
