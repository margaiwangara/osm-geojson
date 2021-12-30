export type InputDataProps = {
  min_lat: string;
  min_lon: string;
  max_lat: string;
  max_lon: string;
};

export type GeoProps = {
  id: string;
  name: string;
  description: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  long_name: string;
  from?: string;
  to?: string;
};
