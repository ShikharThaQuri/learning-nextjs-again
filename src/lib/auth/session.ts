import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export function verifyCookie(token: string | undefined = "") {
  try {
    const decoded = jwt.verify(token, "shikhar123");
    console.log("Decoded JWT:", decoded);

    return decoded;
  } catch (error) {
    return null;
  }
}

export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    return null;
  }
}
