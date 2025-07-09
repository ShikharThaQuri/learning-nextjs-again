import cookie from "cookie";
import jwt from "jsonwebtoken";
import { UserType } from "@/models/User";

export function issueCookie(user: UserType) {
  const MaxAge = 1000 * 60 * 60 * 24 * 7; // 7 days

  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: MaxAge,
  });

  const serializedCookie = cookie.serialize("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: MaxAge,
    sameSite: "strict",
    path: "/",
  });

  return { serializedCookie };
}

export function verifyCookie(token: string | undefined = "") {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    return decoded;
  } catch (error) {
    return null;
  }
}
