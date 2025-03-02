import path from "node:path";
//import Logger from "./logger/logger.js";
import express from "express";
import { router } from "./src/routes/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import protectedRoutes from "./src/routes/protected.routes.js";
//const logger = new Logger();

const APPP_PORT = 3000;

const app = express();

app.use(express.json());

app.use("/", router);

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.listen(APPP_PORT, () => {
  console.log(`Express is listening on port ${APPP_PORT}`);
  //logger.info(`Express is listening on port ${APPP_PORT}`);
});
