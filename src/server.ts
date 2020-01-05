import * as express from "express";
import * as bodyParser from "body-parser";
import { router } from "./routes"

export function initializeServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(router)

  return app;
}
