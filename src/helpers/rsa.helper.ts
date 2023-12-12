import * as FS from 'fs';

import NodeRSA from 'node-rsa';

export class RSAHelper {
  private privateKey: NodeRSA;
  constructor(privateKeyPath?: string) {
    this.loadPrivateKey(privateKeyPath);
  }

  private loadPrivateKey(path?: string) {
    const data = FS.readFileSync(path || 'private-rsa.pem', {});
    this.privateKey = new NodeRSA(data);
  }

  async decrypt(data: string | Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const info = this.privateKey.decrypt(data, 'utf8');
        resolve(info);
      } catch (error) {
        reject(error);
      }
    });
  }

  async encrypt(data: NodeRSA.Data): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const info = this.privateKey.encrypt(data, 'base64');
        resolve(info);
      } catch (error) {
        reject(error);
      }
    });
  }
}
