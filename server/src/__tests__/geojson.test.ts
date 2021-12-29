const request = require('supertest');
const server = require('../index');

describe('GeoJSON Controller Test', () => {
  it('should test that req.coords is defined', async () => {
    const res = await request(server).get('/api/geojson');
    expect(res.badRequest).toBe(true);
    expect(res.body.error).toBe('Coordinates for coords=minLon,minLat,maxLon,maxLat are required');
  });
  it.todo('should test that req.coords is a string separated by commas');
  it.todo('should test that req.coords is an array of length 4 when split by commas');
  it.todo('should test that latitudes are greater than -90 and less than 90');
  it.todo('should test that longitudes are greater than -180 and less than 180');
});
