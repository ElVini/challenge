import parser from "csv-parser";
import fs from "fs";
import { join } from "path";

import { Station, RawStation } from "../types";

/**
 * Contiene todas las estaciones del archivo csv, si el length es 0,
 * se debe llamar la función loadStations
 */
const stations: Array<Station> = [];

/**
 * Se debe llamar una vez al iniciar el proyecto.
 */
const loadStations = (): Promise<Station[]> => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(__dirname, "_files", "stations.csv"))
      .pipe(parser())
      .on("data", (data: RawStation) =>
        stations.push({
          id: Number(data.id),
          coords: [Number(data.latitude), Number(data.longitude)],
          obcn: data.obcn,
          name: data.name,
          location: data.location,
          status: data.status,
        })
      )
      .on("error", (err) => reject(err))
      .on("end", () => {
        resolve(stations);
      });
  });
};

export { loadStations, stations };
