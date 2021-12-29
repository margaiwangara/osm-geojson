import express, { Request, Response, NextFunction } from 'express';
import env from './env';
import { errorMiddleware, HttpException } from './middleware/error';
import GeoJSONController from './controllers/geojson.controller';
import cors from 'cors';
import Redis from 'ioredis';
import { MyContext } from './types';

class Server {
  private app: express.Application;
  private PORT: number;
  private geoJSONController: GeoJSONController;
  private redis: Redis.Redis;

  constructor() {
    this.app = express();
    this.PORT = env.PORT;
    this.configuration();
    this.geoJSONController = new GeoJSONController();
    this.routes();
    this.error();
  }

  public configuration() {
    this.redis = new Redis({
      port: env.REDIS_PORT,
      host: env.REDIS_HOST,
      password: env.REDIS_PASSWORD,
    });
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: env.CLIENT_URL,
      })
    );
  }

  private attachRedis = (req: Request, _res: Response, next: NextFunction) => {
    (req as MyContext).redis = this.redis;
    next();
  };

  public routes() {
    this.app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
      res.send('Hello World!');
    });
    this.app.get('/api/geojson', this.attachRedis, this.geoJSONController.getJSONData);
  }

  private error() {
    this.app.use((_req: Request, _res: Response, next: NextFunction) => {
      const error = new Error('Not Found');
      (error as HttpException).status = 404;
      next(error);
    });
    this.app.use(errorMiddleware);
  }

  public start() {
    this.app.listen(this.PORT, () => {
      console.log(`App started in ${env.NODE_ENV} mode on port ${this.PORT}`);
    });
  }
}

const server = new Server();
server.start();

export default server;
