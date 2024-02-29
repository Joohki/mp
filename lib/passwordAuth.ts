import { hash, compare } from "bcryptjs";
export async function hashPassword(password: string) {
  const hashedPassword: string = await hash(password, 12);
  return hashedPassword;
}
export async function verifyPassword(password: string, hashedpassword: string) {
  const isValid: boolean = await compare(password, hashedpassword);
  return isValid;
}
