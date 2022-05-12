import express, { Request } from "express";
import { StationsEndPointQuery, StationsEndPointResponse } from "types";

import { stations, calculateDistance } from "./helpers";

const Router = express.Router();

Router.get(
  "/stations",
  (req: Request<unknown, unknown, unknown, StationsEndPointQuery>, res) => {
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
            stationsResponse.push({ ...station, distance: distanceFromOrigin });
          }
        }
      });

      res.status(200).json({ stations: stationsResponse });
    } else {
      res.status(400).json({ status: "MISSING_FIELDS" });
    }
  }
);

export default Router;
