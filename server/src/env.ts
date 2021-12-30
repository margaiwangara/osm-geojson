import { cleanEnv, num, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  NODE_ENV: str({ default: 'development', choices: ['development', 'production', 'testing'] }),
  CLIENT_URL: str({ default: 'http://localhost:3000' }),

  // Redis
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: '' }),
  REDIS_EXPIRE: num({ default: 3600 }),
});

export default env;
