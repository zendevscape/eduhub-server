import argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  public async hash(password: string): Promise<string> {
    return await argon2.hash(password, { type: argon2.argon2id });
  }

  public async verify(inputPassword: string, referencePassword: string): Promise<boolean> {
    return await argon2.verify(referencePassword, inputPassword, { type: argon2.argon2id });
  }
}
