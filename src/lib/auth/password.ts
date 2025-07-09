import crypto from "crypto";

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
