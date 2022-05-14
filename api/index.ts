import express, { Request, Response } from "express";

import { StationsEndPointResponse, StationsEndPointQuery } from "../types";
import { loadStations, calculateDistance } from "../helpers";

const app = express();

app.get(
  "/api/stations",
  async (
    req: Request<unknown, unknown, unknown, StationsEndPointQuery>,
    res: Response
  ) => {
    try {
      const stations = await loadStations();
      if (req.query.latitude && req.query.longitude) {
        const distance = Number(req.query.distance);
        const stationsResponse: StationsEndPointResponse = [];
        const originCoordinates: [number, number] = [
          Number(req.query.latitude),
          Number(req.query.longitude),
        ];

        stations.forEach((station) => {
          const distanceFromOrigin = calculateDistance(
            originCoordinates,
            station
          );
          if (typeof req.query.distance === "undefined") {
            stationsResponse.push({ ...station, distance: distanceFromOrigin });
          } else {
            if (distance >= distanceFromOrigin) {
              stationsResponse.push({
                ...station,
                distance: distanceFromOrigin,
              });
            }
          }
        });

        res.status(200).json({ stations: stationsResponse });
      } else {
        res.status(400).json({ status: "MISSING_FIELDS" });
      }
    } catch (err) {
      res.status(500).send("INTERNAL_ERROR");
    }
  }
);

export default app;
