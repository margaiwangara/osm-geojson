// import request from 'supertest';
import GeoJSONController from '../controllers/geojson.controller';
import { HttpException } from '../middleware/error';

describe('GeoJSON Controller Test', () => {
  let geoJSONController: GeoJSONController;

  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    geoJSONController = new GeoJSONController();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should test that req.coords is defined', async () => {
    const mockRequest: any = {
      query: {
        coords: '',
      },
    };

    await geoJSONController.getJSONData(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(
      new HttpException('Coordinates for coords=minLon,minLat,maxLon,maxLat are required', 400)
    );
  });
  it('should test that minLon, minLat, maxLon, maxLat are defined', async () => {
    const mockRequest: any = {
      query: {
        coords: 'a,b,c,d',
      },
    };

    await geoJSONController.getJSONData(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(
      new HttpException('minLon,minLat,maxLon,maxLat coordinates are required', 400)
    );
  });
  it('should test that latitudes are greater than -90 and less than 90', async () => {
    const mockRequest: any = {
      query: {
        coords: '-122.5,90.5,-121.5,91.5',
      },
    };

    await geoJSONController.getJSONData(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(new HttpException('minLat and maxLat must be between -90 and 90', 400));
  });
  it('should test that longitudes are greater than -180 and less than 180', async () => {
    const mockRequest: any = {
      query: {
        coords: '-180.5,37.5,-181.5,38.5',
      },
    };

    await geoJSONController.getJSONData(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(new HttpException('minLon and maxLon must be between -180 and 180', 400));
  });
});
