import connectDB from "@/db/connect";
import { genHashPassword } from "@/lib/auth/password";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const hashPassword = genHashPassword(password);

    if (!hashPassword) {
      return new Response("Incorrect Password", { status: 401 });
    }

    const user = new User({
      username,
      email,
      hash: hashPassword.hash,
      salt: hashPassword.salt,
    });

    const result = await User.create(user);

    return Response.json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
