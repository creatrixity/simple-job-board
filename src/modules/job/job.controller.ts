import { NextFunction, Request, Response } from "express";
import { Knex } from "knex";
import JobService from "./job.service";

class JobController {
  private jobService: JobService;

  constructor(db: Knex) {
    this.jobService = new JobService(db);
  }

  async getJobs(_req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.jobService.getJobs();
      return res
        .status(200)
        .json({ message: `Found ${results.length} job(s)`, results });
    } catch (e) {
      next(e);
    }
  }

  async saveJob(req: Request, res: Response, next: NextFunction) {
    try {
      const job = req.body;

      await this.jobService.saveJob(job);

      return res.status(201).send("Job was created successfully");
    } catch (e) {
      next(e);
    }
  }
}

export default JobController;
