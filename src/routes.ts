import express from "express";
const Router = express.Router();

Router.get("/stations", (req, res) => {
  res.send("Aló");
});

export default Router;
