import express from "express";
import dotenv from "dotenv";

import { loadStations } from "./helpers";
import Router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

loadStations();
app.use("/api/v1", Router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app };
