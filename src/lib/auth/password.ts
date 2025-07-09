import cookie from "cookie";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserType } from "@/models/User";

export function genHashPassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    hash,
    salt,
  };
}

export function verifyHashPassword(
  password: string,
  hash: string,
  salt: string
) {
  const valHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return valHash === hash;
}

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

export function verifyCookie(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    return decoded;
  } catch (error) {
    return null;
  }
}
