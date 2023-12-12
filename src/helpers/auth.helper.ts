import * as bcrypt from 'bcrypt';
import { AESHelper } from './aes.helper';

export async function generatePasswordToken(baseString: string) {
  const aesHelper = new AESHelper();
  const hashedPw = await bcrypt.hash(baseString, 10);
  const encryptedPw = await aesHelper.encrypt(hashedPw);

  return encryptedPw;
}
