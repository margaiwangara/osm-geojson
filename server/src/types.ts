import { Redis } from 'ioredis';
import { Request } from 'express';

export type RequestProps = {
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
};

export type QueryProps = {
  coords: RequestProps;
};

export interface MyContext extends Request {
  redis: Redis;
}
