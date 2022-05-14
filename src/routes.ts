import express from "express";

import stationsEndPointHandler from "./pages/api/stations";

const Router = express.Router();

Router.get("/stations", stationsEndPointHandler);

export default Router;
