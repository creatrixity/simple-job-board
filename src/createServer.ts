import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { Knex } from "knex";

import jobsRouter from "./modules/job/job.routes";

export function createServer(dbConnection: Knex, port?: number): Express {
  const app: Express = express();

  app.use(bodyParser.json());

  // Cache a copy of the dbConnection socket
  app.locals.dbConnection = dbConnection;

  app.use("/jobs", jobsRouter);

  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Hello 👋 ! Welcome to the simple job board app" });
  });

  if (port) {
    app.listen(port, () => {
      console.log(`☁️ Server is running at https://localhost:${port}`);
    });
  }

  return app;
}
