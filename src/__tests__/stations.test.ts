import request from "supertest";

import { StationsEndPointResponse } from "../types";
import server from "../index";

const expressApp = request(server);

afterAll((done) => {
  server.close();

  done();
});

describe("API responde adecuadamente a los parámetros solicitados", () => {
  test("API responde con las estaciones dentro del rango solicitado", async () => {
    let stationOutOfBounds = false;
    const maxDistance = 80;
    const res = await expressApp.get(
      `/api/stations?latitude=20.66606507797593&longitude=-103.34860877726219&distance=${maxDistance}`
    );

    const { stations }: { stations: StationsEndPointResponse } = res.body;

    stations.forEach((s) => {
      if (s.distance > maxDistance) {
        stationOutOfBounds = true;
      }
    });

    expect(stationOutOfBounds).toBe(false);
  });
  test("API responde con información vacía", async () => {
    const res = await expressApp.get(
      "/api/stations?latitude=20.66606507797593&longitude=-103.34860877726219&distance=0"
    );

    const { stations }: { stations: StationsEndPointResponse } = res.body;

    expect(stations.length).toBe(0);
  });
});
