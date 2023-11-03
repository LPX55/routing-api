import { ethers } from 'ethers';

class RotatingJsonRpcProvider extends ethers.providers.JsonRpcProvider {
  private urls: string[];
  private index: number;
  private retries: number;
  private timeout: number;

  constructor(urls: string[], retries = 3, timeout = 5000) {
    super(urls[0]); // Initialize with the first URL
    this.urls = urls;
    this.index = 0;
    this.retries = retries;
    this.timeout = timeout;
  }

  async send(method: string, params: any): Promise<any> {
    for (let i = 0; i < this.urls.length; i++) {
      for (let j = 0; j < this.retries; j++) {
        try {
          const result = await Promise.race([
            super.send(method, params),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), this.timeout)
            ),
          ]);
          return result;
        } catch (error) {
          // If it's the last retry, rotate to the next provider
          if (j === this.retries - 1) {
            this.index = (this.index + 1) % this.urls.length;
            this.connection.url = this.urls[this.index];
          }
        }
      }
    }
    throw new Error('All providers failed');
  }
}

export { RotatingJsonRpcProvider };