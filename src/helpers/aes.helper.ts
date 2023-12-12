import Crypto from 'crypto-js';

export class AESHelper {
  private aesKey: string;

  constructor(key?: string) {
    this.aesKey = key || process.env.AES_KEY;
    if (!this.aesKey) {
      console.warn('AESHelper has invalid key configuration!');
    }
  }

  async encrypt(data: string) {
    const result = await Crypto.AES.encrypt(data, this.aesKey);
    return result.toString();
  }

  async decrypt(encryptedData: string) {
    try {
      const result = await Crypto.AES.decrypt(encryptedData, this.aesKey);
      return result.toString(Crypto.enc.Utf8);
    } catch (error) {
      return '';
    }
  }
}
