import { Request, Response, NextFunction, Router } from "express";
import JobController from "./job.controller";

const jobsRouter = Router();

jobsRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  const jobController = new JobController(req.app.locals.dbConnection);
  return jobController.saveJob(req, res, next);
});

jobsRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  const jobController = new JobController(req.app.locals.dbConnection);
  return jobController.getJobs(req, res, next);
});

export default jobsRouter;
