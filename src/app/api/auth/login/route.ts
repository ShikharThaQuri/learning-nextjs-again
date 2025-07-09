import connectDB from "@/db/connect";
import User from "@/models/User";
import { issueCookie, verifyHashPassword } from "@/lib/auth/password";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, msg: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    const passwordCheck = verifyHashPassword(password, user?.hash, user?.salt);

    if (!passwordCheck) {
      return Response.json(
        { success: false, msg: "Worng Password" },
        { status: 401 }
      );
    }

    console.log("hello check");

    const { serializedCookie } = issueCookie(user);

    console.log("hello", serializedCookie);

    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: { email },
      },
      {
        headers: {
          "Set-Cookie": serializedCookie,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { success: false, msg: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
