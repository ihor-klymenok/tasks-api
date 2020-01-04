import * as express from "express";
import * as bodyParser from "body-parser";

export function initializeServer() {
  const app = express();

  app.use(bodyParser.json());

  return app;
}
