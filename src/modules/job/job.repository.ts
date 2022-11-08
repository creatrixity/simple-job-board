import { Knex } from "knex";
import Job from "./job.model";

class JobRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getJobs(): Promise<Job[]> {
    const jobs = await this.db("jobs");
    return jobs;
  }

  async create(job: Omit<Job, "id">): Promise<number> {
    const [jobId] = await this.db("jobs").insert(job, ["id"]);
    return jobId;
  }
}

export default JobRepository;
