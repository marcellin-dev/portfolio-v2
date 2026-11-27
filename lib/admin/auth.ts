import crypto from "crypto";

export function hashPassword(password: string): string {
  const key = process.env.ADMIN_PASSWORD ?? "admin";
  return crypto.createHmac("sha256", key).update(password).digest("hex");
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const expected = hashPassword(password);
  if (token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
