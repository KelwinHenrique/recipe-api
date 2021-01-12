import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(NODE_ENV: string) {
    NODE_ENV !== 'lab' && NODE_ENV !== 'prod' ?
      this.envConfig = dotenv.parse(fs.readFileSync(`${NODE_ENV}.env`)) :
      this.envConfig = process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}