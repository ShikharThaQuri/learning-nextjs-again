import crypto from "crypto";
import { UserType } from "@/models/User";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const buffer = crypto.randomBytes(32);
export function genRandomString(length: number) {
  return buffer.toString("hex").slice(0, length);
}

const secretKey = genRandomString(32);
const encodedKey = new TextEncoder().encode(secretKey);

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
    sub: user._id,
    email: user.email,
    username: user.username,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, secretKey as string, {
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

export async function createSession(user: UserType) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const userId = user._id;

  const session = await encrypt({ userId, expiresAt });

  return session;
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}
