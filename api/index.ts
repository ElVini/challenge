import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { StationsEndPointResponse, StationsEndPointQuery } from "../types";
import { StationSchema } from "../schemas";
import { calculateDistance } from "../helpers";

const app = express();

app.get(
  "/api/stations",
  async (
    req: Request<unknown, unknown, unknown, StationsEndPointQuery>,
    res: Response
  ) => {
    try {
      await mongoose.connect(
        "mongodb+srv://mibici:Admin1.@cluster0.awdkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      const stations = await StationSchema.find().exec();
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
    } finally {
      mongoose.connection.close();
    }
  }
);

export default app;
