import connectDB from "@/db/connect";
import User, { UserType } from "@/models/User";
import { verifyHashPassword } from "@/lib/auth/password";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const passwordCheck = verifyHashPassword(password, user?.hash, user?.salt);

    console.log(passwordCheck);

    if (!passwordCheck) {
      return new Response("Worng Password", { status: 400 });
    }

    return Response.json({
      message: "Login successful",
      user: { email },
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
