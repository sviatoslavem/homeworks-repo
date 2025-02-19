import path from "node:path";
//import Logger from "./logger/logger.js";
import express from "express";
import { router } from "./src/routes/index.js";

//const logger = new Logger();

const APPP_PORT = 3000;

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(APPP_PORT, () => {
  console.log(`Express is listening on port ${APPP_PORT}`);
  //logger.info(`Express is listening on port ${APPP_PORT}`);
});
