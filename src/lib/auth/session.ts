import { UserType } from "@/models/User";
import cookie from "cookie";
import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SECRET_KEY as string;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(user: UserType) {
  const MaxAge = 1000 * 60 * 60 * 24 * 7;

  const payload = {
    sub: user?._id,
    username: user?.username,
    email: user.email,
    iat: Date.now(),
  };

  const token = await encrypt(payload);

  const serializedCookie = cookie.serialize("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: MaxAge,
    sameSite: "strict",
    path: "/",
  });

  return { serializedCookie };
}

type SessionPayload = {
  sub: string;
  username: string;
  email: string;
  iat: number;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    return null;
  }
}
