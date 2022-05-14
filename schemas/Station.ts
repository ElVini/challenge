import { Schema, model } from "mongoose";

import { Station } from "../types";

const stationSchema = new Schema<Station>({
  id: { type: Number },
  coords: { type: Array(Number) },
  location: { type: String },
  name: { type: String },
  obcn: { type: String },
  status: { type: String },
});

const StationSchema = model<Station>("stations", stationSchema);

export default StationSchema;
