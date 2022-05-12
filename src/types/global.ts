export type Station = {
  id: number;
  name: string;
  obcn: string;
  location: string;
  coords: [number, number];
  status: "IN_SERVICE" | "NOT_IN_SERVICE";
};

export type RawStation = {
  id: number;
  name: string;
  obcn: string;
  location: string;
  latitude: number;
  longitude: number;
  status: "IN_SERVICE" | "NOT_IN_SERVICE";
};

export type StationsEndPointQuery = {
  latitude?: string;
  longitude?: string;
  distance?: string;
};

export type StationsEndPointResponse = Array<Station & { distance?: number }>;
