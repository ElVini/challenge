import parser from "csv-parser";
import fs from "fs";

import { Station, RawStation } from "types";

/**
 * Contiene todas las estaciones del archivo csv, si el length es 0,
 * se debe llamar la función loadStations
 */
const stations: Array<Station> = [];

/**
 * Se debe llamar una vez al iniciar el proyecto.
 */
const loadStations = (): void => {
  fs.createReadStream("stations.csv")
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
    .on("end", () => {
      console.log("stations array populated");
    });
};

export { loadStations, stations };
