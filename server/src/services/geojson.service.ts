import axios from 'axios';
import { __BASE_URL__ } from '../constants';
import { RequestProps } from '../types';

class GeoJSONService {
  constructor() {}

  public getOSMData = async (params: RequestProps) => {
    try {
      // min_lon,min_lat,max_lon,max_lat
      const { minLat, minLon, maxLat, maxLon } = params;

      const coords = [minLon, minLat, maxLon, maxLat];
      const response = await axios.get(`${__BASE_URL__}?bbox=${coords.join(',')}`);

      return response.data;
    } catch (error) {
      return error;
    }
  };
}

export default GeoJSONService;
