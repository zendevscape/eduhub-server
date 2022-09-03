import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, { type: argon2.argon2id });
}

export async function verifyPassword(
  inputPassword: string,
  referencePassword: string,
): Promise<boolean> {
  return await argon2.verify(referencePassword, inputPassword, { type: argon2.argon2id });
}
