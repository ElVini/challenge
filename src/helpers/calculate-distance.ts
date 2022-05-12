import { Station } from "types";

const toRad = (x: number): number => x * (Math.PI / 180);

/**
 * Regresa la distancia entre las coordenadas y una estación
 * en metros
 */
const calculateDistance = (
  origin: [number, number],
  station: Station
): number => {
  const radius = 6371000;
  const [originLatitude, originLongitude] = origin;
  const [stationLatitude, stationLongitude] = station.coords;

  const dLat = toRad(stationLatitude - originLatitude);
  const dLong = toRad(stationLongitude - originLongitude);
  const radLatOrigin = toRad(originLatitude);
  const radLatStation = toRad(stationLatitude);

  const a =
    (Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLong / 2), 2)) *
    Math.cos(radLatOrigin) *
    Math.cos(radLatStation);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
};

export { calculateDistance };
