import { Response, NextFunction, Request } from 'express';
import GeoJSONService from '../services/geojson.service';
import osmtogeojson from 'osmtogeojson';
import { HttpException } from '../middleware/error';
// import { MyContext } from '../types';

class GeoJSONController {
  private geoJSONService: GeoJSONService;

  constructor() {
    this.geoJSONService = new GeoJSONService();
  }

  public getJSONData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { coords } = req.query as any;
      // const redis = (req as MyContext).redis;

      let error: string | null = null;

      if (!coords) {
        return next(new HttpException('Coordinates for coords=minLon,minLat,maxLon,maxLat are required', 400));
      }

      // coords = '-122.5,37.5,-121.5,38.5'
      const minLon = parseFloat(coords?.split(',')?.[0]);
      const minLat = parseFloat(coords?.split(',')?.[1]);
      const maxLon = parseFloat(coords?.split(',')?.[2]);
      const maxLat = parseFloat(coords?.split(',')?.[3]);

      if (!minLon || !minLat || !maxLon || !maxLat) {
        return next(new HttpException('minLon,minLat,maxLon,maxLat coordinates are required', 400));
      }

      // The latitudes must be between -90 and 90, longitudes between -180 and 180 and the minima must be less than the maxima.
      if (minLat > 90 || minLat < -90 || maxLat > 90 || maxLat < -90) {
        error = 'minLat and maxLat must be between -90 and 90';
      } else if (minLon > 180 || minLon < -180 || maxLon > 180 || maxLon < -180) {
        error = 'minLon and maxLon must be between -180 and 180';
      }

      if (error) {
        return next(new HttpException(error, 400));
      }

      const data = await this.geoJSONService.getOSMData({ minLat, minLon, maxLat, maxLon });

      const geojson = osmtogeojson(data);

      return res.status(200).json(geojson);
      //  get results from redis
      // const redisData = await redis.get(coords);

      // if redis data is not null, return it
      // if (redisData) {
      //   return res.status(200).json(JSON.parse(redisData));
      // } else {
      //   // if redis data is null, convert osm data to geojson and save it to redis
      //   await redis.set(coords, JSON.stringify(data), 'EX', 1000 * 60 * 60 * 24).catch((_err) => {
      //     return res.status(200).json(geojson);
      //   });

      // }
    } catch (error) {
      // console.log('error', error);
      return next(error);
    }
  };
}

export default GeoJSONController;
